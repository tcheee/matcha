const express = require('express');
const router = express.Router();
var multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

const create_user = require('../controllers/user/create_user.js')
const update_user = require('../controllers/user/update_user.js')
const activate_user = require('../controllers/user/activate_user.js')
const login_user = require('../controllers/user/login_user.js')
const create_token = require("../functions/create_token")
const reset_password = require("../controllers/user/reset_password.js")
const resend_password = require("../controllers/user/resend_password.js")
const upload_image = require("../controllers/user/upload_image.js")
const get_all_messages = require("../controllers/message/get_all_messages")
const get_message_order = require("../controllers/message/get_message_order")
const get_all_images = require("../controllers/user/get_all_images.js")
const notification_seen = require("../controllers/notification/notification_seen")
const message_seen = require("../controllers/message/message_seen")
const block_user = require("../controllers/user/block_user.js")
const get_all_blocks = require("../controllers/user/get_all_blocks.js")
const transformIdToArray = require('../functions/transformIdToArray.js')
const maxAge = 24 * 10 * 60 * 60;

router.get('/', (req, res) => {
  res.sendFile("index.html", {root: '../front/dist/front/'});
});

router.post('/register/', upload.single('img'), async (req, res) => {
  let image_upload;
  if (req.file) {
    const encoded = req.file.buffer.toString('base64')
    image_upload = await upload_image(req.body, encoded, 0);
  }
  else {
    image_upload = 0
  }
  let status = await create_user(req.body, true);
  if (status == 0 && image_upload == 0) {
    res.status(200).send({success: true, message: "User successfully register and image uploaded"});
  }
  else if (status == -2 && image_upload == 0) {
    res.status(400).send({success: false, message: "Mail already used" })
  }
  else {
    res.status(404).send({success: false, message: "We were not able to register the user ..."});
  }
});

router.post('/update/', upload.fields([{ name: 'img', maxCount: 1}, {name: 'img1', maxCount: 1}, {name: 'img2', maxCount: 1}, {name: 'img3', maxCount: 1}]), async (req, res) => {
  let image_upload = 0;
  if (req.files) {
    for (elem in req.files) {
      let index = elem[3] ? elem[3] : 0
      const encoded = req.files[elem][0].buffer.toString('base64')
      if (await upload_image(req.body, encoded, index) != 0) {
        image_upload = -1
      }
    }
  }
  let status = await update_user(req.body);
  if (status == 0 && image_upload == 0) {
    let data = {
      user: req.body,
      images: await get_all_images(req.body.email),
    }
    res.status(200).send({success: true, message: "User was updated", data: data});
  }
  else if (status == -2 && image_upload == 0) {
    res.status(400).send({success: false, message: "Mail already used" })
  }
  else {
    res.status(404).send({success: false});
  }
});

router.post('/activate/', (req, res) => {
  let status = activate_user(req.body.id);
  res.send(status);
})

router.post('/login/', async (req, res) => {
    try {
      let user_id = await login_user(req.body.email, req.body.password)
      console.log(user_id);
      if (user_id > 0) {
        let token = create_token(user_id, maxAge)
        res.cookie('jwt', token, {maxAge: maxAge * 1000});
        res.status(200).json({message:"User is connected", id: user_id, jwt: token});
      }
      else {
        res.status(404).send({success: false, message: "Your Email or Password is not valid"})
      }
    } catch (err) {
      console.error(err);
      res.status(404).send("Error trying to login the user: " + err)
    }
});

router.post('/notifications-seen', async (req, res) => {
  let status = await notification_seen(req.body.mail);
  if (status === 0) {
    res.status(200).json({success: true, message:'Notifications updated'})
  }
  else {
    res.status(404).send({success: false, message:'There was a problem updating all the notifications'})
  }
})

router.post('/messages-seen', async (req, res) => {
  let status = await message_seen(req.body.mail);
  if (status === 0) {
    res.status(200).json({success: true, message:'Messages updated'})
  }
  else {
    res.status(404).send({success: false, message:'There was a problem updating all the messages'})
  }
})

router.post('/resend-password', async (req, res) => {
  console.log(req.body)
  const status = await resend_password(req.body);
  if (status == 0) {
    res.status(200).send({success: true});
  }
  else {
    res.status(404).send({success: false});
  }
});

router.post('/reset-password/', async (req, res) => {
  console.log(req.body)
  const status = await reset_password(req.body.uuid, req.body.password);
  if (status == 0) {
    res.status(200).send({success: true});
  }
  else {
    res.status(404).send({success: false});
  }
});

router.get('/all-photos/', async (req, res) => {
  const images = await get_all_images(req.query.mail)
  if (images != -1) {
    res.status(200).json(images)
  }
  else {
    res.status(404).send({success: false, message:'There was a problem getting all the images'})
  }
});

router.get('/message-history/', async (req, res) => {
  const room = req.query.room
  const messages = await get_all_messages(room)
  if (messages != -1) {
    res.status(200).json(messages)
  }
  else {
    res.status(404).send({success: false, message:'There was a problem getting the history'})
  }
});

router.get('/message-order/', async (req, res) => {
  console.log(req.query)
  const mail = req.query.email
  const message_order = await get_message_order(mail)
  if (message_order != -1) {
    res.status(200).json(message_order)
  }
  else {
    res.status(404).send({success: false, message:'There was a problem getting the order of messages'})
  }
});

router.post('/block/', async (req, res) => {
  const message_order = await block_user(req.body)
  console.log(req.body)
  if (message_order != -1) {
    const result = transformIdToArray(await get_all_blocks(req.body.from), "to_mail")
    res.status(200).json({blocked_users: result})
  }
  else {
    res.status(404).send({success: false, message:'There was a problem blocking this user'})
  }
});

router.use((req, res) => {
    res.status(404).send('We did not find what you were looking for ...')
});

module.exports = router;

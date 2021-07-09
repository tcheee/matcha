const express = require('express');
const router = express.Router();

const create_user = require('../controllers/user/create_user.js')
const activate_user = require('../controllers/user/activate_user.js')
const login_user = require('../controllers/user/login_user.js')
const get_all_data = require('../controllers/user/get_all_data.js')
const verify_token = require("../controllers/user/verify_token")
const reset_password = require("../controllers/user/reset_password.js")
const resend_password = require("../controllers/user/resend_password.js")
const timing = require("../controllers/user/update_timestamp")
const create_token = require("../functions/create_token")
const { requireAuth } = require("../middleware/authMiddleware");
const maxAge = 24 * 10 * 60 * 60;

router.get('/', (req, res) => {
  res.sendFile('/Users/tche/Documents/matcha/back/test_back/test_socket.html')
});

router.post('/register/', (req, res) => {
    let status = create_user(req.body);
    res.send(status);
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
        console.log(token);
        res.cookie('jwt', token, {maxAge: maxAge * 1000});
        res.status(200).json({message:"User is connected", id: user_id});
      }
      else {
        res.status(404).send("error")
      }
    } catch (err) {
      console.error(err);
    }
});

router.post('/resend-password/', (req, res) => {
  const status = resend_password(req.body);
  if (status == 0) {
    res.status(200).send({success: true});
  }
  else {
    res.status(404).send({success: true});
  }
});

router.post('/reset-password/', (req, res) => {
  const status = reset_password(req.body.uuid, req.body.password);
  res.send(status);
});

router.post('/all/', async (req, res) => {
  console.log(req.body)
  let data = await get_all_data(req.body.mail)
  console.log(data)
  res.json(data)
});

router.use((req, res) => {
    res.status(404).send('We did not find what you were looking for ...')
});

module.exports = router;

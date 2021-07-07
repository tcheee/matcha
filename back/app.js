const express = require('express')
const cookieParser = require('cookie-parser')

const createUser = require('./routes/create_user.js')
const activateUser = require('./routes/activate_user.js')
const loginUser = require('./routes/login_user.js')
const getAllUser = require('./routes/get_all_users.js')
const getAllData = require('./routes/get_all_data.js')
const jwtCreation = require("./functions/create_token")
const { requireAuth } = require("./middleware/authMiddleware");
const { get } = require('http')
const maxAge = 24 * 10 * 60 * 60;

const app = express()
const port = 3000

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/all/', async (req, res) => {
  console.log(req.body);
  let data = await getAllData.get_all_data(req.body.mail);
  console.log(data);
  res.json(data);
});

app.post('/register/', (req, res) => {
    let status = createUser.create_user(req.body);
    res.send(status);
});

app.post('/activate/', (req, res) => {
  let status = activateUser.activate_user(req.body.id);
  res.send(status);
})

app.post('/login/', async (req, res) => {
    let user_id = await loginUser.login_user(req.body.mail, req.body.password)
    if (user_id > 0) {
      let token = jwtCreation.create_token(user_id)
      res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
      res.status(201).json(user_id);
    }
    else {
      res.status(404).send("error")
    }
});

app.get('/users/', requireAuth, async (req, res) => {
  let users = await getAllUser.get_all_users();
  if (users != null) {
    res.status(200).json(users);
  }
  else {
    res.status(500).json("error");
  }
});

// app.get('/user/:id', requireAuth, (req, res) => {
//   res.send('Send a specific user');
// });

app.use((req, res) => {
    res.status(404).send('We did not find what you were looking for ...');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
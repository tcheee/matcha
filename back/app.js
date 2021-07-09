const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const createUser = require('./routes/create_user.js')
const activateUser = require('./routes/activate_user.js')
const loginUser = require('./routes/login_user.js')
const getAllUser = require('./routes/get_all_users.js')
const getAllData = require('./routes/get_all_data.js')
const verifyToken = require("./routes/verify_token")
const resetPassword = require("./routes/reset_password.js")
const resendPassword = require("./routes/resend_password.js")

const timing = require("./routes/update_timestamp")
const jwtCreation = require("./functions/create_token")
const { requireAuth } = require("./middleware/authMiddleware");
const maxAge = 24 * 10 * 60 * 60;

const app = express()
const port = 3000
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
      origin: 'http://localhost:4200',
      methods: ["GET", "POST", "PATCH"],
      credentials: true
  }
});
const { sendMessage } = require("./sockets/sendMessage.js")(io);
const { getDataAllUsers } = require("./sockets/getDataAllUsers.js")(io);


app.use(express.static('test_back'));
app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(cookieParser())

// HTTP method

app.get('/', (req, res) => {
  res.sendFile('/Users/tche/Documents/matcha/back/test_back/test_socket.html')
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
    try {
      let user_id = await loginUser.login_user(req.body.email, req.body.password)
      console.log(user_id);
      if (user_id > 0) {
        let token = jwtCreation.create_token(user_id, maxAge)
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

app.post('/resend-password/', (req, res) => {
  const status = resendPassword.resend_password(req.body.mail);
  res.send(status);
});

app.post('/reset-password/', (req, res) => {
  const status = resetPassword.reset_password(req.body.uuid, req.body.password);
  res.send(status);
});

app.post('/all/', async (req, res) => {
  console.log(req.body);
  let data = await getAllData.get_all_data(req.body.mail);
  console.log(data);
  res.json(data);
});

app.use((req, res) => {
    res.status(404).send('We did not find what you were looking for ...');
});

// Websocket interactions

const onConnection = (socket) => {
  console.log("made connection here")

  socket.on('data', getDataAllUsers)

}

io.on("connection", onConnection);


// Connecting the server to the port

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

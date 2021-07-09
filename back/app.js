const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const router = require('./routers/router');
const launchSocketConnection = require('./routers/socket_router.js');


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


app.use(express.static('test_back')); // To delete
app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(cookieParser())
app.use(router);
launchSocketConnection(io);


// Connecting the server to the port

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

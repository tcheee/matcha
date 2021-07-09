function launchSocketConnection(io) {
    const { getDataAllUsers } = require("../sockets/getDataAllUsers.js")(io)
    const { handleChat } = require("../sockets/handleChat.js")(io)
    const { handleTyping } = require("../sockets/handleTyping.js")(io)
    const { handleRoomJoining } = require("../sockets/handleRoomJoining.js")(io)

    const onConnection = (socket) => {
        console.log("made connection here")
    
        socket.on('data', getDataAllUsers)
        socket.on('room', handleRoomJoining)
        socket.on('chat', handleChat)
        socket.on('typing', handleTyping)
    }
    
    io.on("connection", onConnection);
}


module.exports = launchSocketConnection;
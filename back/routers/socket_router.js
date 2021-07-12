function launchSocketConnection(io) {
    const { getDataAllUsers } = require("../sockets/getDataAllUsers.js")(io, client)
    const { handleChat } = require("../sockets/handleChat.js")(io)
    const { handleTyping } = require("../sockets/handleTyping.js")(io)
    const { handleRoomJoining } = require("../sockets/handleRoomJoining.js")(io)

    client = {}

    const onConnection = (socket) => {
        console.log("made connection here")

        client[id] = socket.id
    
        socket.on('data', getDataAllUsers)
        socket.on('room', handleRoomJoining)
        socket.on('chat', handleChat)
        socket.on('typing', handleTyping)
    }
    
    io.on("connection", onConnection);
}


module.exports = launchSocketConnection;
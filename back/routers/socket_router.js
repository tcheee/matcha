function launchSocketConnection(io) {
    const { getDataAllUsers } = require("../sockets/getDataAllUsers.js")(io)
    const { handleChat } = require("../sockets/handleChat.js")(io)
    const { handleTyping } = require("../sockets/handleTyping.js")(io)
    const { handleRoomJoining } = require("../sockets/handleRoomJoining.js")(io)

    var client = {}
    var i = 0;

    const onConnection = (socket) => {
        console.log("made connection here")
        client[i] = socket.id
        i++;

        socket.on('data', getDataAllUsers)
        socket.on('room', handleRoomJoining)
        socket.on('chat', handleChat)
        socket.on('typing', handleTyping)
        // socket.on('like', handleLike)
        // socket.on('visit', handleVisit)
        // socket.on('block', handleBlock)
        // socket.on('report', handleReport)
    }
    
    io.on("connection", onConnection);
}


module.exports = launchSocketConnection;
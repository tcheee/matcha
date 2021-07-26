function launchSocketConnection(io) {
    var client = {}

    const set_online = require('../controllers/user/set_online.js')
    const { getDataAllUsers } = require("../sockets/getDataAllUsers.js")(io, client)
    const { handleChat } = require("../sockets/handleChat.js")(io)
    const { handleTyping } = require("../sockets/handleTyping.js")(io, client)
    const { handleRoomJoining } = require("../sockets/handleRoomJoining.js")(io, client)
    const { handleDisconnect } = require("../sockets/handleDisconnect.js")(io, client)
    const { handleLike } = require("../sockets/handleLike.js")(io, client)
    const { handleUnlike } = require("../sockets/handleUnlike.js")(io, client)
    const { handleVisit } = require("../sockets/handleVisit.js")(io, client)
    const { handleBlock } = require("../sockets/handleBlock.js")(io, client)
    const { handleReport } = require("../sockets/handleReport.js")(io, client)

    const onConnection = (socket) => {
        console.log("made connection here")
        client[socket.handshake.auth.mail] = socket.id
        set_online(socket.handshake.auth.mail)
    
        socket.on('data', getDataAllUsers)
        socket.on('room', handleRoomJoining)
        socket.on('chat', handleChat)
        socket.on('typing', handleTyping)
        socket.on('like', handleLike)
        socket.on('unlike', handleUnlike)
        socket.on('visit', handleVisit)
        socket.on('block', handleBlock)
        socket.on('report', handleReport)
        socket.on('disconnect', handleDisconnect)
    }
    
    io.on("connection", onConnection);
}


module.exports = launchSocketConnection;
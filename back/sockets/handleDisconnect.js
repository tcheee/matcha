const set_offline = require('../controllers/user/set_offline.js')

module.exports = (io, client) => {
    const handleDisconnect = function(data, callback) {    
        const socket = this;
        for (elem in client) {
            if (client[elem] == socket.id) {
                set_offline(elem)
                delete client[elem]
                socket.broadcast.emit('login_update', {mail: socket.handshake.auth.mail, login: false})
            }
        }
    }

    return {
        handleDisconnect
    }
  }
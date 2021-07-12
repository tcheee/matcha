const set_offline = require('../controllers/user/set_offline.js')

module.exports = (io, client) => {
    const handleDisconnect = function(data, callback) {    
    const socket = this;

    for (elem in client) {
        console.log(client[elem])
        if (client[elem] == socket.id) {
            delete client[elem]
        }
    }

    /* try set_offline(mail)*/
    }

    return {
        handleDisconnect
    }
  }
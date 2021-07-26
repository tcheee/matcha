const set_offline = require('../controllers/user/set_offline.js')

module.exports = (io, client) => {
    const handleDisconnect = function(data, callback) {    
        const socket = this;
        for (elem in client) {
            console.log(client[elem])
            if (client[elem] == socket.id) {
                set_offline(elem)
                delete client[elem]
            }
        }
    }

    return {
        handleDisconnect
    }
  }
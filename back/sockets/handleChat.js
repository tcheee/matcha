const create_message = require('../controllers/message/create_message.js');
const notifyUser = require('./notifyUser.js');

module.exports = (io,client) => {
    const handleChat = function (data) {
        io.to(data.room).emit('chat', data);
        let room = Array.from(io.of(data.room).adapter.rooms)
        if(room.indexOf(client[data.to_mail]) >= 0) {
          create_message(data, true);
        }
        else {
          create_message(data, false);
          notifyUser(data.to_mail);
        }
      }

    return {
        handleChat
    }
  }
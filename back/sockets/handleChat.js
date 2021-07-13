const create_message = require('../controllers/message/create_message.js')

module.exports = (io) => {
    const handleChat = function (data) {
        console.log(data);
        io.to(data.room).emit('chat', data);
        create_message(data);
      }

    return {
        handleChat
    }
  }
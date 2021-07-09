const getAllData = require('../routes/get_all_data.js')

module.exports = (io) => {
    const handleChat = function (data) {
        io.to(data.room).emit('chat', data);
      }

    return {
        handleChat
    }
  }
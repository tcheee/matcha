module.exports = (io) => {
    const handleChat = function (data) {
      console.log(data);
      io.to(data.room).emit('chat', data);
      }

    return {
        handleChat
    }
  }
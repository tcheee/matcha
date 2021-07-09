module.exports = (io) => {
    const handleTyping = function (data) {
        const socket = this;
        socket.to(data.room).emit('typing', data);
      }

    return {
        handleTyping
    }
  }
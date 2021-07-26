module.exports = (io) => {
    const handleRoomLeaving = function (data) {
        const socket = this;
        socket.leave(data.room);
      }

    return {
        handleRoomLeaving
    }
  }
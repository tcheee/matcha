module.exports = (io) => {
    const handleRoomJoining = function (data) {
        const socket = this;
        socket.join(data.room);
      }

    return {
        handleRoomJoining
    }
  }
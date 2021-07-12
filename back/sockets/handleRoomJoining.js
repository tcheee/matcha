module.exports = (io) => {
    const handleRoomJoining = function (data) {
        console.log(data.room);
        const socket = this;
        socket.join(data.room);
      }

    return {
        handleRoomJoining
    }
  }
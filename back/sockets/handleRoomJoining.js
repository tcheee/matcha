module.exports = (io) => {
    const handleRoomJoining = function (data) {
        console.log('hereeeee I join')
        console.log(data.room);
        const socket = this;
        socket.join(data.room);
      }

    return {
        handleRoomJoining
    }
  }
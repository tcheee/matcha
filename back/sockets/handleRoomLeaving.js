module.exports = (io) => {
    const handleRoomLeaving = function (data) {
        console.log('hereee I leaveee')
        const socket = this;
        socket.leave(data.room);
      }

    return {
        handleRoomLeaving
    }
  }
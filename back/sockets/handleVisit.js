const create_visit = require('../controllers/notification/create_visit.js')
const create_notification = require('../controllers/notification/create_notification.js')

module.exports = (io) => {
    const handleVisit = function (data) {
        //find the right client to send the notification
        //const create_visit = await create_visit(data)
        //const notification = create_notification(data.from, data.to, 'visit')
        const socket = this;
        socket.to(data.room).emit('typing', data);
      }

    return {
        handleVisit
    }
  }
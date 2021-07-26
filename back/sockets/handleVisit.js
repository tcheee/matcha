const create_visit = require('../controllers/notification/create_visit.js')
const create_notification = require('../controllers/notification/create_notification.js')

module.exports = (io, client) => {
    const { notify } = require("./notifyUser.js")(io, client)
    const handleVisit = function (data) {
        const socket = this;
        data.type = 'visit'
        const visit = await create_visit(data)
        const notif = await create_notification(data)
        notify(data);
      }

    return {
        handleVisit
    }
  }
const create_visit = require('../controllers/notification/create_visit.js')

module.exports = (io, client) => {
    const { notify } = require("./notifyUser.js")(io, client)
    const handleVisit = async function (data) {
        const socket = this;
        data.type = 'visit'
        const visit = await create_visit(data)
        notify(data);
      }

    return {
        handleVisit
    }
  }
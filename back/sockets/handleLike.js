const create_like = require('../controllers/notification/create_like.js')
const create_notification = require('../controllers/notification/create_notification.js')

module.exports = (io, client) => {
    const { notify } = require("./notifyUser.js")(io, client)
    const handleLike = async function (data) {
        console.log('hereee for a like')
        data.likes = 1;
        data.type = 'like'
        const like = await create_like(data)
        const notif = await create_notification(data)
        notify(data);
      }

    return {
        handleLike
    }
  }
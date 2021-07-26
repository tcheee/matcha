const create_like = require('../controllers/notification/create_like.js')
const create_notification = require('../controllers/notification/create_notification.js')

module.exports = (io) => {
    const handleLike = async function (data) {
        console.log('Here is a like')
        console.log(data)
        data.likes = 1;
        data.type = 'like'
        const like = await create_like(data)
        const notif = await create_notification(data)
        console.log(like)
        console.log(notif)

        //find the right client to send the notification
        //const result_like = await create_like(data)
        //io.to(data.room).emit('chat', data);
      }

    return {
        handleLike
    }
  }
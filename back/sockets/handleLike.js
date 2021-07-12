const create_like = require('../controllers/notification/create_like.js')
const create_notification = require('../controllers/notification/create_notification.js')

module.exports = (io) => {
    const handleLike = async function (data) {
        //find the right client to send the notification
        //const result_like = await create_like(data)
        /*if (result_like == '') {
            //const notification = create_notification(data.from, data.to, 'like')
        }
        else if (result_like == '') {
            //const notification = create_notification(data.from, data.to, 'like')
        }
        else if (result_like == '') {
            //const notification = create_notification(data.from, data.to, 'like')
        }*/
        io.to(data.room).emit('chat', data);
      }

    return {
        handleLike
    }
  }
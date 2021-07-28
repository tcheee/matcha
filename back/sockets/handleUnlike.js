const create_like = require('../controllers/notification/create_like.js')

module.exports = (io, client) => {
    const { notify } = require("./notifyUser.js")(io, client)
    const handleUnlike = async function (data) {
        data.likes = -1;
        data.type = 'unlike'
        const like = await create_like(data)
        notify(data);
      }

    return {
        handleUnlike
    }
  }
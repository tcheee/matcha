const create_like = require('../controllers/notification/create_like.js')

module.exports = (io, client) => {
    const { notify } = require("./notifyUser.js")(io, client)
    const handleLike = async function (data) {
        data.likes = 1;
        data.type = 'like'
        const like = await create_like(data)
        notify(data);
      }

    return {
        handleLike
    }
  }
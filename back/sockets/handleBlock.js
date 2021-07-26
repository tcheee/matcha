const block_user = require('../controllers/user/block_user.js')

module.exports = (io, client) => {
    const { notify } = require("./notifyUser.js")(io, client)
    const handleBlock = function (data) {
      block_user(data.from, data.to)
      notify(data)
    }

    return {
        handleBlock
    }
  }
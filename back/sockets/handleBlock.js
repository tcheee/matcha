const block_user = require('../controllers/user/block_user.js')

module.exports = (io) => {
    const handleBlock = function (data) {
      block_user(data.from, data.to)
    }

    return {
        handleBlock
    }
  }
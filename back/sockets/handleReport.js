const report_behavior = require('../controllers/user/report_behavior.js')

module.exports = (io) => {
    const handleReport = function (data) {
      report_behavior(data.from, data.to)
    }

    return {
        handleReport
    }
  }
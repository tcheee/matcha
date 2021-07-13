const get_all_data = require('../controllers/user/get_all_data.js')

module.exports = (io, client) => {
    const getDataAllUsers = async function(data, callback) {
        let mail = data.mail
        const socket = this;
        const token = socket.handshake.auth.token;
        console.log(token)
        try {
          const all_data = await get_all_data(mail);
          callback({data: all_data});
        } catch (err) {
          console.error(err);
        }
      }

    return {
        getDataAllUsers
    }
  }
const get_all_data = require('../controllers/user/get_all_data.js')

module.exports = (io, client) => {
    const getDataAllUsers = async function(data, callback) {
        console.log(client);
        const socket = this;
        const token = socket.handshake.auth.token;
        console.log(token)
        try {
          const all_data = await get_all_data("test@mail.com");
          console.log(all_data);
          callback({data: all_data});
        } catch (err) {
          console.error(err);
        }
      }

    return {
        getDataAllUsers
    }
  }
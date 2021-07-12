const get_all_data = require('../controllers/user/get_all_data.js')

module.exports = (io) => {
    const getDataAllUsers = async function(data, callback) {
        const socket = this;
        console.log(data)
        // const token = socket.handshake.auth.token;
        // console.log(token)
        try {
          const all_data = await get_all_data("test@mail.com");
          // console.log(all_data);
          callback({data: all_data});
        } catch (err) {
          console.error(err);
        }
      }

    return {
        getDataAllUsers
    }
  }
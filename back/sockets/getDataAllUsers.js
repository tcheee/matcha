const getAllData = require('../controllers/user/get_all_data.js')

module.exports = (io) => {
    const getDataAllUsers = async function(data, callback) {
        const socket = this;
        console.log(data)
        console.log(data.id)
        const token = socket.handshake.auth.token;
        console.log(token)
        try {
          const all_data = await getAllData.get_all_data("test@mail.com");
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
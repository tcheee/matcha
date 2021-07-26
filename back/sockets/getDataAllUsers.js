const get_all_data = require('../controllers/user/get_all_data.js');
const { requireAuth } = require('../middleware/authMiddleware.js');

module.exports = (io, client) => {
    const getDataAllUsers = async function(data, callback) {
        let mail = data.mail
        const socket = this;
        const token = socket.handshake.auth.token;
        try {
          const result = await requireAuth(token)
          if (result === 0) { 
            const all_data = await get_all_data(mail);
            callback({data: all_data});
          }
          else {
            callback({data:null, error_message: 'invalid token'});
          }
        } catch (err) {
          console.error(err);
        }
      }

    return {
        getDataAllUsers
    }
  }
const create_message = require('../controllers/message/create_message.js');

module.exports = (io,client) => {
    const { notify } = require("./notifyUser.js")(io, client)
    const handleChat = async function (data) {
        io.to(data.room).emit('chat', data);
        let room = Array.from(io.of(data.room).adapter.rooms)
        if(room.indexOf(client[data.to_mail]) >= 0) {
          create_message(data, true);
        }
        else {
          await create_message(data, false);
          notify(data);
        }
      }

    return {
        handleChat
    }
  }
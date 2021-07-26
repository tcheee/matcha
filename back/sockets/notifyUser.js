const get_all_self = require('../controllers/user/get_all_self.js');
const checkUserOnline = require('../functions/checkUserOnline.js')

const notifySpecificUser = (client, mail) => {
    return new Promise(async (resolve, reject) => { 
        try { 
            if (checkUserOnline(client, mail)) {
                const self = await get_all_self(mail);
                resolve (self);
            }
            else {
                resolve (false)
            }
        }
        catch (err) {
            console.log(err)
            resolve (false)
        }
    })
}

module.exports = (io, client) => {
    const notify = async function(data) {
        const socket = this;
        try {
            const from = await notifySpecificUser(client, data.from)
            const to = await notifySpecificUser (client, data.to)
            if (from) {
                io.sockets.socket(client[data.from]).emit('notification_update', {data: from})
            }
            if (to) {
                io.sockets.socket(client[data.to]).emit('notification_update', {data: to})
            }
        } catch (err) {
          console.error(err);
        }
      }

    return {
        notify
    }
  }
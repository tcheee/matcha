const get_all_self = require('../controllers/user/get_all_self.js');
const checkUserOnline = require('../functions/checkUserOnline.js')
const create_notification = require('../controllers/notification/create_notification.js')

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

const checkAllowedUser = (from, to) => {
    return new Promise(async (resolve, reject) => { 
        try { 
            const result = await get_all_self(to)
            result.blocks.map(elem => {
                if (from == elem.target) {
                    resolve (false);
                }
            })
            resolve (true)
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
        if (data.to === undefined) {
            data.to = data.to_mail
        }
        try {
            console.log(client)
            const allowed = await checkAllowedUser(data.from, data.to)
            if (allowed) { 
               await create_notification(data)
            }
            const from = await notifySpecificUser(client, data.from)
            const to = await notifySpecificUser(client, data.to)
            if (from) {
                io.to(client[data.from]).emit('notification_update', {data: from})
            }
            if (to && allowed) {
                io.to(client[data.to]).emit('notification_update', {data: to})
            }
        } catch (err) {
          console.error(err);
        }
      }

    return {
        notify
    }
  }
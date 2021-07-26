const get_all_users = require('./get_all_users.js')
const get_first_image = require('./get_first_image.js')
const get_all_self = require('./get_all_self.js')

 function addFirstImage(users) {
    return new Promise(async (resolve, reject) => {
        try {
            for (elem in users) {
                users[elem].image = await get_first_image(users[elem].mail)
            }
            resolve (0)
        } catch (err) {
            console.error(err);
            reject(err)
          }

    })
}

async function get_all_data(mail) {
    const data = {};

    data.users = await get_all_users(mail);
    await addFirstImage(data.users);
    const self = await get_all_self(mail)
    if (self !== -1) {
        data.self = self
    }
    return (data);
}

module.exports = get_all_data;
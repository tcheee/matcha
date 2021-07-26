const get_all_users = require('./get_all_users.js')
const get_all_self = require('./get_all_self.js')
const addDataToUsers = require('../../functions/addDataToUsers.js')

async function get_all_data(mail) {
    const data = {};

    data.users = await get_all_users(mail);
    await addDataToUsers(data.users, mail);
    const self = await get_all_self(mail)
    if (self !== -1) {
        data.self = self
    }
    return (data);
}

module.exports = get_all_data;
const get_all_users = require('./get_all_users.js')
const get_all_blocks = require('./get_all_blocks.js')
const get_all_matches = require('./get_all_matches.js')
const get_all_likes = require('./get_all_likes.js')
const get_all_unlikes = require('./get_all_unlikes.js')
const get_all_received_likes = require('./get_all_received_likes.js')
const get_all_received_unlikes = require('./get_all_received_unlikes.js')
const get_all_visits = require('./get_all_visits.js')
const get_specific_user = require('./get_specific_user.js')
const get_first_image = require('./get_first_image.js')
const get_all_notifications = require('../notification/get_all_notifications.js')
const get_unseen_notifications = require('../notification/get_unseen_notifications.js')
const get_unseen_messages = require('../message/get_unseen_messages.js')
const get_all_images = require('./get_all_images.js')

function transformIdToArray(object, column_name) {
    var array = [];
    for (i in object) {
        let data = {
            target: object[i][column_name],
            room: object[i]['room']
        }
        array[i] = data
    }
    return (array);
}

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
    data.self = {};

    data.users = await get_all_users(mail);
    await addFirstImage(data.users);
    data.self.user = await get_specific_user(mail);
    data.self.notifications_unseen = await get_unseen_notifications(mail);
    data.self.notifications = await get_all_notifications(mail);
    data.self.messages_unseen = await get_unseen_messages(mail);
    data.self.blocks = transformIdToArray(await get_all_blocks(mail), "to_mail");
    data.self.matches = transformIdToArray(await get_all_matches(mail), "case");
    data.self.likes = transformIdToArray(await get_all_likes(mail), "to_mail");
    data.self.unlikes = transformIdToArray(await get_all_unlikes(mail), "to_mail");
    data.self.received_likes = transformIdToArray(await get_all_received_likes(mail), "to_mail");
    data.self.received_unlikes = transformIdToArray(await get_all_received_unlikes(mail), "to_mail");
    data.self.visits = transformIdToArray(await get_all_visits(mail), "to_mail");
    data.self.images = await get_all_images(mail)
    data.self.login = true;

    return(data);
}

module.exports = get_all_data;
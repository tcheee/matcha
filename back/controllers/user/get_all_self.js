const get_all_blocks = require('./get_all_blocks.js')
const get_all_matches = require('./get_all_matches.js')
const get_all_likes = require('./get_all_likes.js')
const get_all_unlikes = require('./get_all_unlikes.js')
const get_all_received_likes = require('./get_all_received_likes.js')
const get_all_received_unlikes = require('./get_all_received_unlikes.js')
const get_all_visits = require('./get_all_visits.js')
const get_specific_user = require('./get_specific_user.js')
const get_all_notifications = require('../notification/get_all_notifications.js')
const get_unseen_notifications = require('../notification/get_unseen_notifications.js')
const get_unseen_messages = require('../message/get_unseen_messages.js')
const get_all_images = require('./get_all_images.js')

function transformIdToArray(object, column_name) {
    var array = [];
    for (i in object) {
        let data = {
            target: object[i][column_name],
        }
        if (column_name === "case") {
            data.room = object[i]['room']
        }
        array[i] = data
    }
    return (array);
}

async function get_all_self(mail) {
    return new Promise(async (resolve, reject) => {
        try { 
            self = {};
            self.user = await get_specific_user(mail);
            self.notifications_unseen = await get_unseen_notifications(mail);
            self.notifications = await get_all_notifications(mail);
            self.messages_unseen = await get_unseen_messages(mail);
            self.blocks = transformIdToArray(await get_all_blocks(mail), "to_mail");
            self.matches = transformIdToArray(await get_all_matches(mail), "case");
            self.likes = transformIdToArray(await get_all_likes(mail), "to_mail");
            self.unlikes = transformIdToArray(await get_all_unlikes(mail), "to_mail");
            self.received_likes = transformIdToArray(await get_all_received_likes(mail), "from_mail");
            self.received_unlikes = transformIdToArray(await get_all_received_unlikes(mail), "from_mail");
            self.visits = transformIdToArray(await get_all_visits(mail), "to_mail");
            self.images = await get_all_images(mail)
            self.login = true;
            resolve (self);
        } catch (err) {
            console.log(err)
            resolve(-1);
        }
    });
}

module.exports = get_all_self;
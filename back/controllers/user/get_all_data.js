const get_all_users = require('./get_all_users.js')
const get_all_blocks = require('./get_all_blocks.js')
const get_all_matches = require('./get_all_matches.js')
const get_all_likes = require('./get_all_likes.js')
const get_all_unlikes = require('./get_all_unlikes.js')
const get_all_received_likes = require('./get_all_received_likes.js')
const get_all_received_unlikes = require('./get_all_received_unlikes.js')

function transformIdToArray(object, column_name) {
    var array = [];
    for (i in object) {
        array[i] = object[i][column_name];
    }
    console.log(array);
    return (array);
}

async function get_all_data(mail) {
    const data = {};
    data.self = {};

    data.users = await get_all_users();
    data.self.blocks = transformIdToArray(await get_all_blocks(mail), "to_mail");
    data.self.matches = transformIdToArray(await get_all_matches(mail), "case");
    data.self.likes = transformIdToArray(await get_all_likes(mail), "to_mail");
    data.self.unlikes = transformIdToArray(await get_all_unlikes(mail), "to_mail");
    data.self.received_likes = transformIdToArray(await get_all_received_likes(mail), "to_mail");
    data.self.received_unlikes = transformIdToArray(await get_all_received_unlikes(mail), "to_mail");

    return(data);
}

module.exports = get_all_data;
const getAllUser = require('./get_all_users.js')
const getAllBlocks = require('./get_all_blocks.js')
const getAllMatches = require('./get_all_matches.js')
const getAllLikes = require('./get_all_likes.js')
const getAllUnlikes = require('./get_all_unlikes.js')
const getReceivedLikes = require('./get_all_received_likes.js')
const getReceivedUnlikes = require('./get_all_received_unlikes.js')

function transformIdToArray(object, column_name) {
    var array = [];
    for (i in object) {
        array[i] = object[i][column_name];
    }
    console.log(array);
    return (array);
}

const get_all_data = async (mail) => {
    const data = {};
    data.self = {};

    data.users = await getAllUser.get_all_users();
    data.self.blocks = transformIdToArray(await getAllBlocks.get_all_blocks(mail), "to_mail");
    data.self.matches = transformIdToArray(await getAllMatches.get_all_matches(mail), "case");
    data.self.likes = transformIdToArray(await getAllLikes.get_all_likes(mail), "to_mail");
    data.self.unlikes = transformIdToArray(await getAllUnlikes.get_all_unlikes(mail), "to_mail");
    data.self.received_likes = transformIdToArray(await getReceivedLikes.get_all_received_likes(mail), "to_mail");
    data.self.received_unlikes = transformIdToArray(await getReceivedUnlikes.get_all_received_unlikes(mail), "to_mail");

    return(data);
}

module.exports.get_all_data = get_all_data;
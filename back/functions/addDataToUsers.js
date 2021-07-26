const get_first_image = require('../controllers/user/get_first_image.js')
const get_specific_user = require('../controllers/user/get_specific_user')
const get_distance = require('./get_distance.js')

function addDataToUsers(users, requestMail) {
    return new Promise(async (resolve, reject) => {
        try {
            const requestUser = await get_specific_user(requestMail)
            for (elem in users) {
                users[elem].image = await get_first_image(users[elem].mail)
                users[elem].distance = requestUser.lat ? await get_distance(requestUser.lat, requestUser.lng, users[elem].lat, users[elem].lng) : null
            }
            resolve (0)
        } catch (err) {
            console.error(err);
            reject(err)
          }

    })
}

module.exports = addDataToUsers;
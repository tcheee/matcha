const db = require('../../db/db.js')

function get_specific_user(mail) {
    return new Promise(async (resolve, reject) => {
        db.query('Select id, mail, first_name, last_name, age, genre, orientation, lat, lng, is_geolocated, biography, fame, last_connection, interests from public.users where mail = $1;', [mail], (err, result) => {
            if (err) {
                console.log(err)
                reject(null)
            }
            else {
                var users = result.rows;
                // users = users.map(user => {
                //     user.interests = user.interests.split(';');
                //     return user;
                // })
                resolve (users)
            }
        })
    })
}

module.exports = get_specific_user;
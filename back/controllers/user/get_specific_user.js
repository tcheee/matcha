const db = require('../../db/db.js')

function get_specific_user(mail) {
    return new Promise(async (resolve, reject) => {
        db.query('Select id, mail, first_name, last_name, age, genre, orientation, lat, lng, is_geolocated, biography, fame, last_connection, interests from public.users where mail = $1;', [mail], (err, result) => {
            if (err) {
                console.log(err)
                resolve (false)
            }
            else {
                if (result.rows != undefined) {
                    var user = result.rows[0];
                    resolve (user)
                }
                else {
                    resolve (false)
                }
            }
        })
    })
}

module.exports = get_specific_user;
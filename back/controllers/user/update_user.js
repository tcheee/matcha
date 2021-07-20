const db = require('../../db/db.js')

function update_user(data) {
    console.log(data.lat)
    return new Promise(async (resolve, reject) => {
        db.query('UPDATE USERS set mail = $2, first_name = $3, last_name = $4, age = $5, genre = $6, orientation = $7, biography = $8, interests = $9, lat = $10, lng = $11 where id=$1;', [data.id, data.email, data.firstName, data.lastName, data.age, data.gender, data.orientation, data.biography, data.interest, data.lat, data.lng], (err, result) => {
            if (err) {
                if (err.constraint == 'users_mail_key') {
                    console.log('Mail already exists in the db.')
                    resolve (-2)
                }
                else {
                    console.log(err)
                    resolve (-1)
                }
            }
            else {
                console.log("User was updated");
                resolve(0)
            }
        })
    });
}

module.exports = update_user;
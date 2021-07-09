const db = require('../db/db.js')

function get_all_users() {
    return new Promise((resolve, reject) => {
        db.query('Select id, mail, first_name, last_name, age, genre, orientation, lat, lng, biography, fame, last_connection, interests from public.users;', [], (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                var users = result.rows;
                users = users.map(user => {
                    user.interests = user.interests.split(';');
                    return user;
                })
                resolve(users)
            }
        });
    });
}

module.exports.get_all_users = get_all_users;
const db = require('../../db/db.js')

function get_all_users(mail) {
    return new Promise((resolve, reject) => {
        db.query('Select id, mail, first_name, last_name, age, genre, orientation, lat, lng, biography, fame, last_connection, interests, is_online from public.users where mail != $1 order by id DESC;', [mail], (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                var users = result.rows;
                // users = users.map(user => {
                //     user.interests = user.interests.split(';');
                //     return user;
                // })
                resolve(users)
            }
        });
    });
}

module.exports = get_all_users;
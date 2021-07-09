const db = require('../../db/db.js')

function get_specific_user(id) {
    db.query('Select id, mail, first_name, last_name, age, genre, orientation, lat, lng, biography, fame, last_connection, interests from public.users where id = $1;', [id], (err, result) => {
        if (err) {
            console.log(err)
            return(null)
        }
        else {
            const users = result.rows;
            users = users.map(user => {
                user.interests = user.interests.split(';');
                return user;
            })
            return(users)
        }
      })
}

module.exports = get_specific_user;
const db = require('../db/db.js')

function create_user(body) {
    console.log(body)
    let unix_timestamp = Date.now();
    let date = new Date(unix_timestamp)
    let interests = body.interests.join(';');

    db.query('INSERT INTO users(mail, password, first_name, last_name, age, genre, orientation, lat, lng, biography, last_connection, is_active, interests) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);', [body.mail, body.password, body.first_name, body.last_name, body.age, body.genre, body.orientation, body.lat, body.lng, body.biography, date, '0', interests], (err, result) => {
        if (err) {
            console.log(err)
            return(-1);
        }
        else {
            return(0)
        }
      })
}

module.exports.create_user = create_user;
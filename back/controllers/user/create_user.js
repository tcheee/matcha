const db = require('../../db/db.js')
const send_mail = require('./send_mail.js')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;


function create_user(body) {
    const uuid = uuidv4();
    let unix_timestamp = Date.now();
    let date = new Date(unix_timestamp)
    let interests = body.interests.join(';');

    body.password = bcrypt.hash(body.password, saltRounds);

    db.query('INSERT INTO users(uuid, mail, password, first_name, last_name, age, genre, orientation, lat, lng, biography, last_connection, is_active, interests) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id;', [uuid, body.mail, body.password, body.first_name, body.last_name, body.age, body.genre, body.orientation, body.lat, body.lng, body.biography, date, '0', interests], (err, result) => {
        if (err) {
            console.log(err)
            return(-1)
        }
        else {
            const content = "Hello " + body.first_name + ", you create an account to access Matcha. Please click on this link to active your account : http://localhost:4200/activate-account/" + uuid
            const subject = "Hello, please confirm you Matcha account 👋👋👋"
            send_mail(body.mail, subject, content);
            return(id_user)
        }
      })
}

module.exports = create_user;
const db = require('../../db/db.js')
const send_mail = require('./send_mail.js')
const activate_user = require('./activate_user.js')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;


function create_user(body, prod_bool) {
    return new Promise(async (resolve, reject) => {
    const uuid = uuidv4();
    let unix_timestamp = Date.now();
    let date = new Date(unix_timestamp)
    console.log(body)

    body.password = await bcrypt.hash(body.password, saltRounds);

    body.age = parseInt(body.age,10);

    db.query('INSERT INTO users(uuid, mail, password, first_name, last_name, age, genre, orientation, lat, lng, is_geolocated, biography, last_connection, is_active, interests) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id;', [uuid, body.email, body.password, body.firstName, body.lastName, body.age, body.gender, body.orientation, body.lat, body.lng, body.is_geolocated, body.biography, date, '0', body.interest], (err, result) => {
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
            const content = "Hello " + body.firstName + ", you create an account to access Matcha. Please click on this link to active your account : http://localhost:4200/activate-account/" + uuid // LOCAL
            //const content = "Hello " + body.firstName + ", you create an account to access Matcha. Please click on this link to active your account : https://matcha-heroku.herokuapp.com/activate-account/" + uuid   // PROD
            const subject = "Hello, please confirm you Matcha account 👋👋👋"
            prod_bool === true ? send_mail(body.email, subject, content) : activate_user(result.rows[0].id)
            resolve (0)
        }
      })
    })
}

module.exports = create_user;
const db = require('../db/db.js')
const mail = require('./send_mail.js')
const bcrypt = require('bcrypt');


async function login_user(mail, password) {
    db.query('SELECT * from public.users where mail = $1;', [mail], (err, res) => {
        if (res) {
            const result = res.rows[0]
            const auth = await bcrypt.compare(password, result.password);
            if (auth) {
                return (result.id);
            }
            else {
                return(-2);
            }
        }
        else {
            console.log(err);
            return (-1);
        }
      })
}

module.exports.login_user = login_user;
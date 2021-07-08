const db = require('../db/db.js')
const bcrypt = require('bcrypt');


function login_user(mail, password) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from public.users where mail = $1;', [mail], (err, res) => {
            console.log(res.rows[0]);
            if (res.rows[0] != undefined) {
                const result = res.rows[0];
                const auth = bcrypt.compare(password, result.password);
                if (auth) {
                    console.log("Let's connect " + mail + " to the app!");
                    resolve(result.id);
                }
                else {
                    reject("error");
                }
            }
            else {
                console.log(err);
                reject("error");
            }
        })
        });
}

module.exports.login_user = login_user;
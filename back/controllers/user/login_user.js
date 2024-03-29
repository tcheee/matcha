const db = require('../../db/db.js')
const bcrypt = require('bcrypt');


function login_user(mail, password) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from public.users where mail = $1 and is_active=true', [mail], async (err, res) => {
            try {
                if (res) {
                    if (res.rows[0] != undefined) {
                        const result = res.rows[0];
                        const auth = await bcrypt.compare(password, result.password);
                        if (auth) {
                            console.log("Let's connect " + mail + " to the app!");
                            resolve(result.id);
                        }
                        else {
                            resolve("-1");
                        }
                    }
                    else {
                        resolve("-1");
                    }
                }
                else {
                    resolve("no db connected")
                }
            } catch(err) {
                console.log(err)
                reject(err);
            }
        })
        });
}

module.exports = login_user;
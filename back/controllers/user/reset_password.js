const db = require('../../db/db.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function reset_password(uuid, password) {
    return new Promise(async (resolve, reject) => {
        password = await bcrypt.hash(password, saltRounds);

        db.query('UPDATE USERS set password=$1 where uuid=$2;', [password,uuid], (err, result) => {
            if (err) {
                console.log(err)
                reject(err);
            }
            else {
                resolve(0)
            }
        })
    })
}

module.exports = reset_password;
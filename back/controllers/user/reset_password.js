const db = require('../../db/db.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function reset_password(uuid, password) {
    return new Promise(async (resolve, reject) => {
        password = await bcrypt.hash(password, saltRounds);

        db.query('UPDATE USERS set password=$1 where uuid=$2;', [password,uuid], (err, result) => {
            if (err) {
                console.log(err)
                resolve(-1);
            }
            else {
                if (result.rows != undefined) {
                    resolve(0)
                }
                else
                {
                    resolve (-1)
                }
            }
        })
    })
}

module.exports = reset_password;
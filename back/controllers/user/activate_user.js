const db = require('../../db/db.js')

function activate_user(uuid) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE USERS set is_active=true where uuid=$1;', [uuid], (err, result) => {
            if (err) {
                console.log(err)
                resolve(-1);
            }
            else {
                if (result.rows != undefined) {
                    resolve(0)
                }
                else {
                    resolve(-1)
                }
            }
        })
    })
}

module.exports = activate_user;
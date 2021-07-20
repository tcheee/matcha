const db = require('../../db/db.js')

function notification_seen(mail) {
    return new Promise((resolve, reject) => { 
        db.query('UPDATE NOTIFICATIONS set seen = true where id=$1;', [mail], (err, result) => {
            if (err) {
                console.log(err)
                resolve(-1);
            }
            else {
                resolve(0)
            }
        })
    })
}

module.exports = notification_seen;
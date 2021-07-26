const db = require('../../db/db.js')

function message_seen(mail) {
    return new Promise((resolve, reject) => { 
        db.query('UPDATE INBOXES set seen = true where to_mail=$1;', [mail], (err, result) => {
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

module.exports = message_seen;
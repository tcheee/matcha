const db = require('../../db/db.js')

function notification_seen(mail) {
    db.query('UPDATE NOTIFICATIONS set seen = true where id=$1;', [mail], (err, result) => {
        if (err) {
            console.log(err)
            return(-1);
        }
        else {
            return(0)
        }
      })
}

module.exports = notification_seen;
const db = require('../db/db.js')

function create_notification(body) {
    db.query('INSERT INTO notifications(from_mail, to_mail, notification_type) VALUES($1, $2, $3) RETURNING id;', [body.from_mail, body.to_mail, body.type], (err, result) => {
        if (err) {
            console.log(err)
            return(-1)
        }
        else {
            const id_user = result.rows[0].id
            return(id_user)
        }
      })
}

module.exports = create_notification;
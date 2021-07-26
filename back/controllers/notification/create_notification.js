const db = require('../../db/db.js')

function create_notification(data) {
    return new Promise((resolve, reject) => { 
    db.query('INSERT INTO notifications(from_mail, to_mail, notification_type) VALUES($1, $2, $3) RETURNING id;', [data.from, data.to, data.type], (err, result) => {
        if (err) {
            console.log(err)
            resolve(-1)
        }
        else {
            if (result.rows != undefined) {
                resolve(result.rows[0].id)
            }
            else {
                resolve(-1)
            }
        }
      })
    });
}

module.exports = create_notification;
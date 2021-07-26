const db = require('../../db/db.js')

function get_all_notifications(mail) {
    return new Promise((resolve, reject) => {
        db.query('Select from_mail, notification_type, seen, creation_time from public.notifications where to_mail = $1 order by creation_time DESC;', [mail], (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                if (result.rows != undefined ){
                    resolve(result.rows)
                }
                else {
                    resolve(-1)
                }
            }
        });
    });
}

module.exports = get_all_notifications;
const db = require('../../db/db.js')

function get_all_notifications(mail) {
    return new Promise((resolve, reject) => {
        db.query('Select * from public.notifications where to_mail = $1;', [mail], (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                const notifications = result.rows;
                resolve(notifications)
            }
        });
    });
}

module.exports = get_all_notifications;
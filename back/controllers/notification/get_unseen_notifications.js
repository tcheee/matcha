const db = require('../../db/db.js')

function get_unseen_notifications(mail) {
    return new Promise((resolve, reject) => {
        db.query('Select count(id) from public.notifications where to_mail = $1 and seen = false;', [mail], (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                if (result.rows != undefined) { 
                    const number_notifications = result.rows[0];
                    resolve(number_notifications)
                }
                else {
                    resolve(0)
                }
            }
        });
    });
}

module.exports = get_unseen_notifications;
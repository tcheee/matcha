const db = require('../../db/db.js')

function get_unseen_messages(mail) {
    return new Promise((resolve, reject) => {
        db.query('Select count(id) from public.inboxes where to_mail = $1 and seen = false;', [mail], (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                if (result.rows != undefined) { 
                    resolve(result.rows[0].count)
                }
                else {
                    resolve(0)
                }
            }
        });
    });
}

module.exports = get_unseen_messages;
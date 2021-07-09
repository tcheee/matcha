const db = require('../db/db.js')

function get_all_messages(data) {
    return new Promise((resolve, reject) => {
        db.query('Select * from public.inboxes where (from_mail = $1 and to_mail = $2) or (from_mail = $2 and to_mail = $1);', [data.user, data.target], (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                const messages = result.rows;
                resolve(messages)
            }
        });
    });
}

module.exports.get_all_messages = get_all_messages;
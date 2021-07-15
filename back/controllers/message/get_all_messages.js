const db = require('../../db/db.js')

function get_all_messages(from_mail, to_mail) {
    return new Promise((resolve, reject) => {
        db.query('Select * from public.inboxes where (from_mail = $1 and to_mail = $2) or (from_mail = $2 and to_mail = $1) order by creation_time;', [from_mail, to_mail], (err, result) => {
            if (err) {
                console.log(err)
                reject(-1)
            }
            else {
                console.log(result.rows)
                const messages = result.rows;
                resolve(messages)
            }
        });
    });
}

module.exports = get_all_messages;
const db = require('../../db/db.js')

function get_all_messages(room) {
    return new Promise((resolve, reject) => {
        db.query('Select * from public.inboxes where room = $1 order by creation_time;', [room], (err, result) => {
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
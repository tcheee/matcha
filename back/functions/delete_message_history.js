const db = require('../db/db.js')

function delete_message_history(room) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM public.inboxes where room = $1;', [room], (err, result) => {
            if (err) {
                console.log(err)
                resolve(-1)
            }
            else {
                resolve(0)
            }
        })
    })
}

module.exports = delete_message_history;
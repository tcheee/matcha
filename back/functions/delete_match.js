const db = require('../db/db.js')
const delete_message_history = require("./delete_message_history.js")

function delete_match(mail_a, mail_b, room) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM public.matches where (mail_a = $1 and mail_b = $2) or (mail_a = $2 and mail_b = $1);', [mail_a, mail_b], async (err, result) => {
            if (err) {
                console.log(err)
                resolve(-1)
            }
            else {
                if (await delete_message_history(room) == -1) {
                    resolve(-1)
                }
                resolve(0)
            }
        })
    })
}

module.exports = delete_match;
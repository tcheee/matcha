const db = require('../../db/db.js')

function get_message_order(mail) {
    return new Promise((resolve, reject) => {
    db.query('select * from inboxes where id in (select max(id) from inboxes where (from_mail = $1 or to_mail = $1) group by room) order by id DESC;', [mail], (err, result) => {
        if (err) {
            console.log(err)
            resolve(-1)
        }
        else {
            if (result.rows != undefined ){
                const messages = result.rows
                resolve(messages)
            }
            else {
                resolve(-1)
            }
        }
      })
    })
}

module.exports = get_message_order;
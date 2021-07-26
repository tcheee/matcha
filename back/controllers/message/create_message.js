const db = require('../../db/db.js')

function create_message(data, bool) {
    return new Promise((resolve, reject) => {
    db.query('INSERT INTO inboxes(from_mail, to_mail, content, room, seen) VALUES($1, $2, $3, $4, $5) RETURNING id;', [data.from_mail, data.to_mail, data.content, data.room, bool], (err, result) => {
        if (err) {
            console.log(err)
            resolve(-1)
        }
        else {
            const id_user = result.rows[0].id
            resolve(id_user)
        }
      })
    })
}

module.exports = create_message;
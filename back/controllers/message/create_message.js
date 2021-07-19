const db = require('../../db/db.js')

function create_message(data) {
    db.query('INSERT INTO inboxes(from_mail, to_mail, content, room) VALUES($1, $2, $3, $4) RETURNING id;', [data.from, data.to, data.content, data.room], (err, result) => {
        if (err) {
            console.log(err)
            return(-1)
        }
        else {
            const id_user = result.rows[0].id
            return(id_user)
        }
      })
}

module.exports = create_message;
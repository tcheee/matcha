const db = require('../db/db.js')

function create_match(id_a, id_b) {
    db.query('INSERT INTO matches(mail_a, mail_b) VALUES($1, $2) RETURNING id;', [id_a, id_b], (err, result) => {
        if (err) {
            console.log(err)
            return(-1)
        }
        else {
            const id_match = result.rows[0].id
            return(id_match)
        }
      })
}

module.exports.create_match = create_match;
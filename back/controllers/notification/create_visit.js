const db = require('../db/db.js')
const match = require('../functions/check_match.js')

function create_visit(body) {
    db.query('INSERT INTO visits(from_mail, to_mail) VALUES($1, $2);', [body.from_mail, body.to_mail], (err, result) => {
        if (err) {
            console.log(err)
            return(-1)
        }
        else {
            const id_like = result.rows[0].id
            return(id_like)
        }
      })
}

module.exports = create_visit;
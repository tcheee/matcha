const db = require('../db/db.js')

function block_user(from, to) {
    db.query('INSERT INTO blocks(from_mail, to_mail, blocked) VALUES($1, $2, $3) RETURNING id;', [from, to, '1'], (err, result) => {
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

module.exports.block_user = block_user;
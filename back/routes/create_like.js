const db = require('../db/db.js')
const match = require('../functions/check_match.js')

function create_like(body) {
    db.query('INSERT INTO likes(from_mail, to_mail, likes) VALUES($1, $2, $3) RETURNING id;', [body.from_mail, body.to_mail, body.like], (err, result) => {
        if (err) {
            console.log(err)
            return(-1)
        }
        else {
            const id_like = result.rows[0].id
            return(id_like)
        }
      })
    
    match.check_match(body.from_mail, body.to_mail, body.like);
}

module.exports.create_like = create_like;
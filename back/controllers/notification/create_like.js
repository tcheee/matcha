const db = require('../db/db.js')
const check_match = require('../functions/check_match.js')
const update_rating = require('../functions/update_rating.js')

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
    

    update_rating(body.to_mail);
    check_match(body.from_mail, body.to_mail, body.like);
}

module.exports = create_like;
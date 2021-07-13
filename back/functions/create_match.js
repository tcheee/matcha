const db = require('../db/db.js')
const { v4: uuidv4 } = require('uuid');

function create_match(id_a, id_b) {
    const uuid_room = uuidv4();

    db.query('INSERT INTO matches(mail_a, mail_b, room) VALUES($1, $2, $1) RETURNING room;', [id_a, id_b, uuid_room], (err, result) => {
        if (err) {
            console.log(err)
            return(-1)
        }
        else {
            const room = result.rows[0].room
            return(room)
        }
      })
}

module.exports= create_match;
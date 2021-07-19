const db = require('../db/db.js')
const { v4: uuidv4 } = require('uuid');

function create_match(mail_a, mail_b) {
    return new Promise((resolve, reject) => {
        const uuid_room = uuidv4();

        db.query('INSERT INTO matches(mail_a, mail_b, room) VALUES($1, $2, $3) RETURNING room;', [mail_a, mail_b, uuid_room], (err, result) => {
            if (err) {
                console.log(err)
                resolve(-1)
            }
            else {
                const room = result.rows[0].room
                resolve(room)
            }
        })
    })
}

module.exports= create_match;
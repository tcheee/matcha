const db = require('../../db/db.js')

function create_visit(body) {
    return new Promise(async (resolve, reject) => {
        db.query('INSERT INTO visits(from_mail, to_mail) VALUES($1, $2);', [body.from, body.to], (err, result) => {
            if (err) {
                console.log(err)
                resolve (-1)
            }
            else {
                const ret = result.rows[0]
                resolve (0)
            }
        })
    });
}

module.exports = create_visit;
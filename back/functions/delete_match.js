const db = require('../db/db.js')

function create_match(mail_a, mail_b) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM public.matches where mail_a = $1 and mail_b = $2;', [mail_a, mail_b], (err, result) => {
            if (err) {
                console.log(err)
                resolve(-1)
            }
            else {
                resolve(0)
            }
        })
    })
}

module.exports = create_match;
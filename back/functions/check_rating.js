const db = require('../db/db.js')

function check_rating(mail) {
    return new Promise((resolve, reject) => {
        db.query('SELECT fame from public.users where mail = $1 ;', [mail], (err, result) => {
            if (err) {
                console.log(err)
                resolve(-1)
            }
            else {
                const fame = result.rows[0].fame
                resolve(fame)
            }
        })
    })
}

module.exports= check_rating
const db = require('../../db/db.js')

function get_all_matches(mail) {
    return new Promise((resolve, reject) => {
        db.query('SELECT CASE WHEN mail_a = $1 THEN mail_b WHEN mail_b = $1 THEN mail_a END from public.matches where (mail_a = $1 or mail_b = $1);', [mail], (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                const matches = result.rows;
                resolve(matches)
            }
        });
    });
}

module.exports = get_all_matches;
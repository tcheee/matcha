const db = require('../../db/db.js')

function get_all_visits(mail) {
    return new Promise((resolve, reject) => {
        db.query('Select * from public.visits where from_mail = $1;', [mail], (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                const visits = result.rows;
                resolve(visits)
            }
        });
    });
}

module.exports = get_all_visits;
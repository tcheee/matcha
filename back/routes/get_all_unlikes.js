const db = require('../db/db.js')

function get_all_unlikes(mail) {
    return new Promise((resolve, reject) => {
        db.query('Select * from public.likes where from_mail = $1 and likes = -1;', [mail], (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                const received_likes = result.rows;
                resolve(received_likes)
            }
        });
    });
}

module.exports.get_all_unlikes = get_all_unlikes;
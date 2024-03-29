const db = require('../../db/db.js')

function get_all_received_likes(mail) {
    return new Promise((resolve, reject) => {
        db.query('Select * from public.likes where to_mail = $1 and likes = 1;', [mail], (err, result) => {
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

module.exports = get_all_received_likes;
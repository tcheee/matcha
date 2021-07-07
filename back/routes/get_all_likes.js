const db = require('../db/db.js')

function get_all_likes(mail) {
    return new Promise((resolve, reject) => {
        db.query('Select * from public.likes where from_mail = $1 and likes = 1;', [mail], (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                const likes = result.rows;
                resolve(likes)
            }
        });
    });
}

module.exports.get_all_likes = get_all_likes;
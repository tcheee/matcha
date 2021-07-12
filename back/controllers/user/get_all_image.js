const db = require('../../db/db.js')

function get_all_images(mail) {
    return new Promise((resolve, reject) => {
        db.query('Select * from public.images where mail = $1', [mail], (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                const images = result.rows;
                resolve(images)
            }
        });
    });
}

module.exports = get_all_images;
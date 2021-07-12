const db = require('../../db/db.js')

function get_first_image(mail) {
    return new Promise((resolve, reject) => {
        db.query('Select * from public.images where orders = 0 and user_mail = $1', [mail], (err, res) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                if (res.rows[0] != undefined) {
                    const image = res.rows[0].image_link;
                    resolve(image)
                }
                else {
                    resolve(undefined)
                }
            }
        });
    });
}

module.exports = get_first_image;
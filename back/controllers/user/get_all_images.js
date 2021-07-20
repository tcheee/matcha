const db = require('../../db/db.js')

function get_all_images(mail) {
    return new Promise((resolve, reject) => {
        db.query('Select * from public.images where user_mail = $1 order by orders DESC', [mail], (err, res) => {
            if (err) {
                console.log(err)
                resolve(-1)
            }
            else {
                if (res.rows[0] != undefined) {
                    let images = {};
                    for (i in res.rows) {
                        images["image" + i] = res.rows[i].image_link;
                    }
                    console.log(images);
                    resolve(images)
                }
                else {
                    resolve(undefined)
                }
            }
        });
    });
}

module.exports = get_all_images;
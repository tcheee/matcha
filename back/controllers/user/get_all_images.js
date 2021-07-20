const db = require('../../db/db.js')

function get_all_images(mail) {
    return new Promise((resolve, reject) => {
        db.query('Select * from public.images where user_mail = $1 order by orders DESC', [mail], (err, res) => {
            if (err) {
                console.log(err)
                resolve(-1)
            }
            else {
                let images = {};
                if (res.rows[0] != undefined) {
                    for (i in res.rows) {
                        images["image" + i] = res.rows[i].image_link;
                    }
                }
                else {
                    for (let i = 0; i < 4; i++) {
                        images["image" + i] = '';
                    }
                }
                resolve(images)
            }
        });
    });
}

module.exports = get_all_images;
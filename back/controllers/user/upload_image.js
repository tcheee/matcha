const db = require('../../db/db.js')

function upload_image(body, file, index) {
    return new Promise((resolve, reject) => {
        console.log(body.email)

        db.query('INSERT INTO images(user_mail, image_link, orders) VALUES($1, $2, $3) ON CONFLICT (orders) DO UPDATE SET image_link = $2;', [body.email, file, index], (err, result) => {
            if (err) {
                console.log(err)
                resolve (-1)
            }
            else {
                console.log('image uploaded')
                resolve (0)
            }
        })
    })
}

module.exports = upload_image;
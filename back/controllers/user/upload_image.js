const db = require('../../db/db.js')

function upload_image(body, file) {
    return new Promise((resolve, reject) => {
        //console.log(file)
        // Adapt the function to be able to handle several image at the same time!
        console.log(body.email)

        db.query('INSERT INTO images(user_mail, image_link, orders) VALUES($1, $2, $3);', [body.email, file, 0], (err, result) => {
            if (err) {
                console.log(err)
                resolve (-1)
            }
            else {
                resolve (0)
            }
        })
    })
}

module.exports = upload_image;
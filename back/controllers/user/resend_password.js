const db = require('../../db/db.js')
const send_mail = require('./send_mail.js')

function resend_password(body) {
    console.log(body)
    return new Promise((resolve, reject) => {
    db.query('Select uuid, first_name from public.users where mail = $1;', [body.email], (err, result) => {
        if (err) {
            console.log(err)
            resolve(-1)
        }
        else {
            if (result.rows[0].uuid != undefined) {
                console.log('here')
                const uuid = result.rows[0].uuid
                const first_name = result.rows[0].first_name
                const content = "Hello " + first_name + ", you ask to reinitialize your password for Matcha. Please click on this link to change your password : http://localhost:4200/reset-password/" + uuid
                const subject = "Hello, please follow the link to reset your password 👋👋👋"
                send_mail(body.email, subject, content);
                resolve(0)
            }
            else {
                resolve(-1)
            }
        }
      })
    });
}

module.exports = resend_password;
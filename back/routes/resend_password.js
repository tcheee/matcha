function resend_password(mail) {
    db.query('Select uuid, first_name from public.users where mail = $1;', [mail], (err, result) => {
        if (err) {
            console.log(err)
            return(-1)
        }
        else {
            const uuid = result.rows[0].uuid
            const first_name = result.rows[0].first_name
            const content = "Hello " + first_name + ", you ask to reinitialize your password for Matcha. Please click on this link to change your password : http://localhost:4200/reset-password/" + uuid
            const subject = "Hello, please follow the link to reset your password 👋👋👋"
            mail.send_mail(body.mail, subject, content);
            return(uuid)
        }
      })
}

module.exports.resend_password = resend_password;
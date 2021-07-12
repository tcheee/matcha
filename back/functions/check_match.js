const db = require('../db/db.js')
const create_match = require('./create_match.js')
const delete_match = require('./delete_match.js')

function check_match(from_mail, to_mail, like) {
    if (like == 1) {
        db.query('Select * from public.likes where from_mail = $1 and to_mail = $2 and like = 1;' [body.to_mail, body.from_mail], (err, res) => {
            if (err) {
                console.log(err)
                return(-1)
            }
            else {
                if (res.rows[0] != undefined) {
                    const match_creation = create_match(from_mail, to_mail);
                    return(match_creation)
                }
                else {
                    return (-1);
                }
            }
        })
    }
    else {
        db.query('Select * from public.matches where mail_a = $1 and mail_b = $2;' [body.to_mail, body.from_mail], (err, res) => {
            if (err) {
                console.log(err)
                return(-1)
            }
            else {
                if (res.rows[0] != undefined) {
                    const match_deletion = delete_match(from_mail, to_mail);
                    return(match_deletion)
                }
                else {
                    return (-1);
                }
            }
        })
    }
}

module.exports = check_match;
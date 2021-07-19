const db = require('../db/db.js')
const create_match = require('./create_match.js')
const delete_match = require('./delete_match.js')

function check_match(from_mail, to_mail, like) {
    return new Promise((resolve, reject) => {
        if (like == 1) {
            db.query('Select * from public.likes where from_mail = $1 and to_mail = $2 and like = 1;' [to_mail, from_mail], (err, res) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                else {
                    if (res.rows[0] != undefined) {
                        const match_creation = create_match(from_mail, to_mail);
                        if (match_creation != -1) {
                            resolve({message: "match_created", room: match_creation})
                        }
                        else {
                            resolve ({message: "like_created"})
                        }
                    }
                    else {
                        resolve (-1);
                    }
                }
            })
        }
        else {
            db.query('Select * from public.matches where mail_a = $1 and mail_b = $2;' [to_mail, from_mail], (err, res) => {
                if (err) {
                    console.log(err)
                    rejet (err)
                }
                else {
                    if (res.rows[0] != undefined) {
                        const match_deletion = delete_match(from_mail, to_mail);
                        if (match_deletion != -1) {
                            resolve ({message: "match_deleted"})
                        }
                        else {
                            resolve ({message: "dislike_created"})
                        }
                    }
                    else {
                        resolve (-1);
                    }
                }
            })
        }
    })
}

module.exports = check_match;
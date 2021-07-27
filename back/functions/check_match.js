const db = require('../db/db.js')
const create_match = require('./create_match.js')
const delete_match = require('./delete_match.js')
const create_notification = require('../controllers/notification/create_notification.js')

function check_match(from_mail, to_mail, like) {
    return new Promise((resolve, reject) => {
        console.log(from_mail, to_mail, like)
        if (like == 1) {
            db.query('Select * from public.likes where from_mail = $1 and to_mail = $2 and likes = 1;', [to_mail, from_mail], async (err, res) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                else {
                    if (res.rows[0] != undefined) {
                        console.log(res.rows[0])
                        const match_room = await create_match(from_mail, to_mail);
                        if (match_room != -1) {
                            await create_notification({from: from_mail, to: to_mail, type: "match"});
                            resolve({message: "match_created", room: match_room})
                        }
                        else {
                            resolve ({message: "error whil creating the match"})
                        }
                    }
                    else {
                        resolve (-1);
                    }
                }
            })
        }
        else {
            db.query('Select * from public.matches where (mail_a = $1 and mail_b = $2) or (mail_a = $2 and mail_b = $1);', [to_mail, from_mail], async (err, res) => {
                if (err) {
                    console.log(err)
                    rejet (err)
                }
                else {
                    if (res.rows[0] != undefined) {
                        const match_deletion = await delete_match(from_mail, to_mail);
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
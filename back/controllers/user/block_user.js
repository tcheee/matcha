const db = require('../../db/db.js')
const create_like = require('../notification/create_like.js')

function block_user(data) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO blocks(from_mail, to_mail, blocked) VALUES($1, $2, $3) RETURNING id;', [data.from, data.to, '1'], async (err, result) => {
            if (err) {
                console.log(err)
                resolve (-1)
            }
            else {
                const id_user = result.rows[0].id
                data.likes = -1;
                data.type = 'unlike'
                const like = await create_like(data)
                if (like == -1) {
                    resolve (-1)
                }
                else {
                    resolve (id_user)
                }
            }
        })
    })
}

module.exports = block_user;
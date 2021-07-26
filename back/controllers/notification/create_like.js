const db = require('../../db/db.js')
const check_match = require('../../functions/check_match.js')
const update_rating = require('../../functions/update_rating.js')

function insertLikeDb(body) {
    return new Promise(async (resolve, reject) => { 
        db.query('INSERT INTO likes(from_mail, to_mail, likes) VALUES($1, $2, $3) ON CONFLICT (from_mail, to_mail) DO UPDATE SET likes = $3 RETURNING id;', [body.from, body.to, body.likes], (err, result) => {
            if (err) {
                console.log(err)
                resolve(-1)
            }
            else {
                const id_like = result.rows[0].id
                resolve(id_like)
            }
        })
    });
}


async function create_like(body) {
    return new Promise(async (resolve, reject) => {
        const result = await insertLikeDb(body);
        if (result !== -1) {
            update_rating(body.to, body.likes);
            let match = await check_match(body.from, body.to, body.likes);
            resolve(match)
        }
        else {
            console.log('error while creating the like')
            resolve(-1);
        }
    })
}

module.exports = create_like;
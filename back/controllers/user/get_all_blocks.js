const db = require('../../db/db.js')

function get_all_blocks(mail) {
    return new Promise((resolve, reject) => {
        db.query('Select * from public.blocks where from_mail = $1;', [mail], (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                const blocks = result.rows;
                resolve(blocks)
            }
        })
    });
}

module.exports = get_all_blocks;
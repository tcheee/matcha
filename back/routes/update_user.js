const db = require('../db/db.js')

function update_user(id) {
    db.query('UPDATE USERS set is_active=true where id=$1;', [id], (err, result) => {
        if (err) {
            console.log(err)
            return(-1);
        }
        else {
            return(0)
        }
      })
}

module.exports.update_user = update_user;
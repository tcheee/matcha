const db = require('../../db/db.js')

function activate_user(uuid) {
    db.query('UPDATE USERS set is_active=true where uuid=$1;', [uuid], (err, result) => {
        if (err) {
            console.log(err)
            return(-1);
        }
        else {
            return(0)
        }
      })
}

module.exports = activate_user;
const db = require('../../db/db.js')

function activate_online(id) {
    db.query('UPDATE USERS set is_online=true where id=$1;', [id], (err, result) => {
        if (err) {
            console.log(err)
            return(-1);
        }
        else {
            return(0)
        }
      })
}

module.exports = activate_online;
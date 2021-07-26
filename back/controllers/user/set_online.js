const db = require('../../db/db.js')

function set_online(mail) {
    db.query('UPDATE USERS set is_online = true where mail=$1;', [mail], (err, result) => {
        if (err) {
            console.log(err)
            return(-1);
        }
        else {
            return(0)
        }
      })
}

module.exports = set_online;
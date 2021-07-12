const db = require('../../db/db.js')

function set_offline(mail) {
    let unix_timestamp = Date.now();
    let date = new Date(unix_timestamp)

    db.query('UPDATE USERS set is_online = false and last_connection = $1 where id=$2;', [date, mail], (err, result) => {
        if (err) {
            console.log(err)
            return(-1);
        }
        else {
            return(0)
        }
      })
}

module.exports.set_offline = set_offline;
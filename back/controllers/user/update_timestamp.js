const db = require('../../db/db.js')

function update_timestamp(id) {
    const timestamp = Date.now();
    timestamp = new Date(timestamp);

    db.query('UPDATE USERS set last_connection = $2 where id=$1;', [id, timestamp], (err, result) => {
        if (err) {
            console.log(err)
            return(-1);
        }
        else {
            return(0)
        }
      })
}

module.exports = update_timestamp;
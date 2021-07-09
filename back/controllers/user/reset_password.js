const db = require('../../db/db.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function reset_password(uuid, password) {
    password = await bcrypt.hash(password, saltRounds);

    db.query('UPDATE USERS set password=$1 where uuid=$2;', [password,uuid], (err, result) => {
        if (err) {
            console.log(err)
            return(-1);
        }
        else {
            return(0)
        }
      })
}

module.exports = reset_password;
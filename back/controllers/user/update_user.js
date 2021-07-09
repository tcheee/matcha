const db = require('../../db/db.js')

function update_user(data) {
    data.interests = data.interests.join(';');

    db.query('UPDATE USERS set mail = $2, password = $3, first_name = $4, last_name = $5, age = $6, genre = $7, orientation = $8, biography = $9, interests = $10 where id=$1;', [data.id, data.mail, data.password, data.first_name, data.last_name, data.age, data.genre, data.orientation, data.biography, data.interests], (err, result) => {
        if (err) {
            console.log(err)
            return(-1);
        }
        else {
            console.log("user updated");
            return(0)
        }
      })
}

module.exports = update_user;
const db = require('../../db/db.js')

function update_user(data) {
    data.interests = data.interests.join(';');

    db.query('UPDATE USERS set mail = $2, first_name = $3, last_name = $4, age = $5, genre = $6, orientation = $7, biography = $8, interests = $9 where id=$1;', [data.id, data.mail, data.first_name, data.last_name, data.age, data.genre, data.orientation, data.biography, data.interests], (err, result) => {
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
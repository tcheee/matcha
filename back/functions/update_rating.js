const db = require('../db/db.js')
const check_rating = require('./check_rating.js')

async function update_rating(mail, like) {
    let fame = await check_rating(mail);

    if (fame == -1) {
        return (-1)
    }
    else {
        fame += like 
        if (fame >= 0) {
            db.query('UPDATE USERS set fame = $2 where mail=$1;', [mail, fame], (err, result) => {
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
        else {
            return (0);
        }
    }
}

module.exports = update_rating;
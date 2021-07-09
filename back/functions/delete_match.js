const db = require('../db/db.js')

function create_match(id_a, id_b) {
    db.query('DELETE FROM public.matches where id_a = $1 and id_b = $2;', [id_a, id_b], (err, result) => {
        if (err) {
            console.log(err)
            return(-1)
        }
        else {
            return(0)
        }
      })
}

module.exports = create_match;
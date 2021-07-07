const jwt = require('jsonwebtoken');

function verify_token(token) {
    jwt.verify(token, 'secret key', (err, decodedToken) =>{
        if (err) {
            console.log(err.message);
            return(false)
        }
        else {
            console.log(decodedToken);
            return(true);
        }
    });
}

module.exports.verify_token = verify_token;
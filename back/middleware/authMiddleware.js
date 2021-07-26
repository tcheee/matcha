const jwt = require('jsonwebtoken');

function requireAuth(token) {
    return new Promise ((resolve, reject) => {
        if (token) {
            jwt.verify(token, 'secret key', (err, decodedToken) => {
                if (err) {
                    console.log(err.message);
                    resolve (-1)
                }
                else {
                    console.log(decodedToken);
                    resolve (0);
                }
            });
        }
        else {
            resolve (-1);
        }
    });
}

module.exports.requireAuth = requireAuth;
const jwt = require('jsonwebtoken');

function requireAuth(req,res, next) {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'secret key', (err, decodedToken) =>{
            if (err) {
                console.log(err.message);
                res.status(404).redirect('/');
            }
            else {
                console.log(decodedToken);
                next();
            }
        });
    }
    else {
        res.status(404).redirect('/');
    }
}

module.exports.requireAuth = requireAuth;
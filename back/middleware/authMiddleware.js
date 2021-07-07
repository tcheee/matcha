const jwt = require('jsonwebtoken');

function requireAuth(req,res, next) {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'We are going to match with as many people as possible because diversity is good for growth', (err, decodedToken) =>{
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
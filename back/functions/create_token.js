const jwt = require('jsonwebtoken');

function create_token(id, maxAge) {
    return jwt.sign({id}, 'secret key', {
        expiresIn: maxAge
    });
}

module.exports.create_token = create_token;
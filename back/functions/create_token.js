const jwt = require('jsonwebtoken');

function create_token(id, maxAge) {
    return jwt.sign({id}, 'We are going to match with as many people as possible because diversity is good for growth', {
        expiresIn: maxAge
    });
}

module.exports.create_token = create_token;
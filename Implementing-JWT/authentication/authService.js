const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyUser({email, password}, user){
    if(user && user.email === email && user.password === password){
        return true;
    }
    return false;
}

function createToken(user){
    const payload = {
        email: user.email,
        id: user.id,
        name: user.name
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: 3600 });
    return token;
}
module.exports = {
    verifyUser,
    createToken
}
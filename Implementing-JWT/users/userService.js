const userDAO = require('./userDAO');

function finduser(email, done){
    userDAO.findUser(email, done);
}
function registerUser(userDetails, done){
    userDAO.registerUser(userDetails, done);
}
module.exports = {
    finduser,
    registerUser
}
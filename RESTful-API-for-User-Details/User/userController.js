const userService = require('./userService');

const getUsers = function(done) {
    userService.getAllUsers(done);
}
const getUserById = function(userId, done) {
    userService.getUserById(userId, done);
}
const updateUserDetails = function(userId, userName, done) {
    userService.updateUserDetails(userId, userName, done);
}
const createUser = function(newUser, done) {
    userService.createUser(newUser, done);
}

const deleteUser = function(userId, done) {
    userService.deleteUser(userId, done);
}

module.exports = {
    getUsers,
    getUserById,
    updateUserDetails,
    createUser,
    deleteUser
}
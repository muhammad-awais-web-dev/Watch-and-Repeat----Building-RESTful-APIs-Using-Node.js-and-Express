const fs= require('fs');
const path = require('path');

const getUsers = function(done){
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            return done( "Encountered Error while getting users" );
        }
        let users = JSON.parse(data);
        return done( undefined, users );
    })
}
const getUserById = function(userId,done){
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            return done( "Encountered Error while getting users" );
        }
        let userData = JSON.parse(data);
        let user = userData.find(u => u.userId === userId);
        if (!user) {
            return done("User not found");
        }
        return done(undefined, user);
    });
}
const updateUserDetails = function(userId, userName, done){
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            return done( "Encountered Error while getting users" );
        }
        let userData = JSON.parse(data);
        let userIndex = userData.findIndex(u => u.userId === userId);
        if (userIndex === -1) {
            return done("User not found");
        }
        userData[userIndex].userName = userName;
        fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(userData), (err,updatedcontent) => {
            if (err) {
                return done("Encountered Error while updating user");
            }
            return done(undefined, "Successfully updated user details");
        });
    });
}

module.exports = {
    getUsers,
    getUserById,
    updateUserDetails
}
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

const createUser = function(newUser, done){
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            return done("Encountered Error while reading users");
        }
        let userData = JSON.parse(data);
        
        // Generate new userId
        const newUserId = userData.length > 0 ? Math.max(...userData.map(u => u.userId)) + 1 : 1;
        newUser.userId = newUserId;
        
        userData.push(newUser);
        
        fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(userData, null, 2), (err) => {
            if (err) {
                return done("Encountered Error while creating user");
            }
            return done(undefined, newUser);
        });
    });
}

const deleteUser = function(userId, done){
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            return done("Encountered Error while reading users");
        }
        let userData = JSON.parse(data);
        const userIndex = userData.findIndex(u => u.userId === userId);
        
        if (userIndex === -1) {
            return done("User not found");
        }
        
        userData.splice(userIndex, 1);
        
        fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(userData, null, 2), (err) => {
            if (err) {
                return done("Encountered Error while deleting user");
            }
            return done(undefined, "Successfully deleted user");
        });
    });
}

module.exports = {
    getUsers,
    getUserById,
    updateUserDetails,
    createUser,
    deleteUser
}
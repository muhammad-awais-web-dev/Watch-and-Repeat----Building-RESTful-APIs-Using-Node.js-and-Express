const users = require('./users.json');
const fs = require('fs');
const path = require('path');

function findUser(email, done){
    const user = users.find(u => u.email === email);
    if(user){
        return done(undefined, user);
    } else {
        return done(undefined, null);
    }
}
function registerUser(userDetails, done){
    users.push(userDetails);
    const filePath = path.join(__dirname, 'users.json');
    // use async writeFile so the callback is executed and we can report errors
    fs.writeFile(filePath, JSON.stringify(users, null, 4), 'utf8', (err) => {
        if(err){
            return done("Error while saving user");
        }
        return done(undefined, userDetails);
    });
}

module.exports = {
    findUser,
    registerUser
}
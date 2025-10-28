const userService = require('../users/userService');
const authService = require('./authService');

const registerUser = function(userDetails, done){
    userService.finduser(userDetails.email, (err, existingUser) => {
        if(err){
            return done("Error while checking existing user");
        }
        else if(existingUser){
            // existingUser is not an error object; return a clear error message
            return done("User already exists");
        }
        else{
            userService.registerUser(userDetails, done);
        }
    });
}

module.exports = {
    registerUser
}
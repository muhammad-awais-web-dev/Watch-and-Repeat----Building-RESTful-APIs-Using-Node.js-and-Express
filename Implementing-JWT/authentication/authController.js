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
function loginUser(email, password, done){
    userService.finduser(email, (err, user) => {
        if(err){
            return done(err);
        }

        // verify credentials
        const userVerified = authService.verifyUser({email, password}, user);
        if(userVerified){
            try{
                const jwtToken = authService.createToken(user);
                return done(undefined, jwtToken);
            } catch (e) {
                return done('Error creating token');
            }
        }

        return done('Invalid email or password');
    });
}

module.exports = {
    registerUser,
    loginUser
}
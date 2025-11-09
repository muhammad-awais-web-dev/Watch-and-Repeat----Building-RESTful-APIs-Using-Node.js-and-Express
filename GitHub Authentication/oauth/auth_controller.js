const oauthservice = require('./auth_service');

function oauthprocessor(code, done) {
    oauthservice.getGitHubAccessToken(code, (err, token) => {
        if (err) {
            return done(err, null);
        }
        done(null, token);
    })
}

module.exports = {oauthprocessor};
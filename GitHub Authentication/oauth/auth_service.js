const axios = require('axios');
const config = require('../config');

function getGitHubAccessToken(code,done)
{
    const body = {
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        code: code,
    }
    const opts = {headers: {Accept: 'application/json'}};

    axios.post('https://github.com/login/oauth/access_token', body, opts).then((res) => res.data.access_token)
    .then((token) => {
        done(null, token);
    })
    .catch((err) => done(err, null));
}

module.exports = {getGitHubAccessToken};
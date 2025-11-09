const {response} = require('express');
const express = require('express');
const config = require('../config');
const router = express.Router();
const oauthctrl = require('./auth_controller');


router.get('/login', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.CLIENT_ID}`);
});

router.get('/callback', (req, res) => {
    try {
        oauthctrl.oauthprocessor(req.query.code, (err, token) => {
            if (err) {
                return res.status(401).json({error: 'Bad Request'});
            }
            res.redirect('./welcome.html?access_token=' + token);
        });
    } catch (error) {
        res.status(500).json({error: 'Authentication failed'});
    }
});

module.exports = router;
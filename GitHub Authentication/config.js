require('dotenv').config();

const config = {
    PORT: process.env.PORT || 3000,
    CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
}

module.exports = config;
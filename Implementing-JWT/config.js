const config = {
    PORT: process.env.PORT || 3000,
    // JWT secret used for signing tokens
    jwtSecret: process.env.JWT_SECRET || process.env.AUTH_secret || "secretkey",
}

module.exports = config;
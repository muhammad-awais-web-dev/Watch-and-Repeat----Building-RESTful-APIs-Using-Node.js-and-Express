const express = require('express');
const app = express();
const config = require('./config');
const userRouter = require('./User');

const LoggerMiddleware = function(req, res, next) {
    console.log(`Logger: ${req.method} ${req.url}`);
    next();
}

app.use(LoggerMiddleware);

app.use(express.json());

app.use('/api/v1/users', userRouter);

app.use((req, res, next) => {
    res.status(400).send('Resource not found');
});

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
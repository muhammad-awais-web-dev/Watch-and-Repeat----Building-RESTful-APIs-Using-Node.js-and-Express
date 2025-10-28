const express = require('express');
const app = express();
const config = require('./config');
const authRouter = require('./authentication/authRouter');
const dateformat = require('date-format');
const morgan = require('morgan');

app.use(express.json());
morgan.token('time',()=> dateformat.asString(dateformat.ISO8601_FORMAT, new Date()));

app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));

app.use('/auth', authRouter);

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});

module.exports = app;
const express = require('express');
const path = require('path');
const dateformat = require('date-format');
const app = express();
const morgan = require('morgan');
const config = require('./config');
const {oauthrouter} = require('./oauth');

morgan.token('time' , () => dateformat.asString(dateformat.ISO8601_FORMAT, new Date()));
app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// Mount oauth router at /oauth
app.use('/oauth', oauthrouter);

// Also mount oauth router at root for direct callback access
app.use('/', oauthrouter);


app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`);
});
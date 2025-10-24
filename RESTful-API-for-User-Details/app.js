const express = require('express');
const app = express();
const config = require('./config');
const userRouter = require('./User');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api-docs/swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const LoggerMiddleware = function(req, res, next) {
    console.log(`Logger: ${req.method} ${req.url}`);
    next();
}

app.use('./api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(LoggerMiddleware);

app.use(express.json());

app.use('/api/v1/users', userRouter);

app.use((req, res, next) => {
    res.status(400).send('Resource not found');
});

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
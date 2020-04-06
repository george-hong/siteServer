const apiRouter = require('express').Router();
const bodyParser = require('body-parser');
const userRouter = require('./api/userRouter');

apiRouter.use(bodyParser.urlencoded({ extended: false }));

apiRouter.use('/api/user', userRouter);

module.exports = apiRouter;
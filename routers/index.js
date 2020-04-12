import express from 'express';
import bodyParser from 'body-parser';
import apiRouterConfig from './apiRouter/routerConfig';
import initApiRouter from './apiRouter/initRouterConfig';
import parseRequestParams from './middleware/parseRequestParams';
import sendData from './middleware/sendData';

const apiRouter = express.Router();

apiRouter.use(bodyParser.urlencoded({ extended: false }));

apiRouter.use('/api', parseRequestParams, initApiRouter(apiRouterConfig), sendData);

module.exports = apiRouter;
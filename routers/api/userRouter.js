const userRouter = require('express').Router();
const { createResponseData } = require('../../common/serverUtilities');
const userHandler = require('./userHandler');

userRouter.post('/sign', (req, res, next) => {
  userHandler.sign(req).then(result => {
    res.send(createResponseData(200, result));
  }, err => { 
    res.send(createResponseData(500, err));
  })
});

module.exports = userRouter;
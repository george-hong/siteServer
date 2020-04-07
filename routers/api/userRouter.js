const userRouter = require('express').Router();
const { createResponseData } = require('../../common/serverUtilities');
const userHandler = require('./userHandler');

// 注册
userRouter.post('/sign', (req, res, next) => {
  const { body } = req;
  userHandler.sign(body, req).then(result => {
    res.send(createResponseData(200, result));
  }, err => { 
    res.send(createResponseData(500, err));
  })
});

// 判断用户是否存在
userRouter.get('/checkAccountIsRepeat', (req, res, next) => {
  const { query } = req;
  userHandler.checkAccountIsRepeat(query, req).then(result => {
    const resultToSend = {
      isExist: !!result.length,
    };
    res.send(createResponseData(200, resultToSend));
  }, err => {
    res.send(createResponseData(500, err));
  })
});

// 登录 登录成功返回账号信息，否则返回null
userRouter.post('/login', (req, res, next) => {
  const { body } = req;
  userHandler.login(body, req).then(result => {
    const resultToSend = {
      accountInfo: result[0] || null,
    };
    res.send(createResponseData(200, resultToSend));
  }, err => {
    res.send(createResponseData(500, err));
  })
});

module.exports = userRouter;
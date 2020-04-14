import jwt from 'jsonwebtoken';
import mySQL from '../../mySQL';
import { tableNames } from '../../mySQL/config';

// 创建token
// payload 需要存储的数据,当前等同于账号信息
// secret 用于反解token的秘钥
// accountInfo 账户信息
const createTokenInfo = (accountInfo) => {
  // 二小时过期
  const { account } = accountInfo;
  const effectiveDuration = 60 * 60 * 2;   // token生效的秒数
  // 在token中添加账号字段，用于在解密时查找数据库
  const secret = createTokenSecret(accountInfo);
  const token = `${account}.${jwt.sign(accountInfo, secret, { expiresIn: effectiveDuration })}`;
  return {
    token,
    expiresTime: Date.now() + effectiveDuration * 1000,
    secret,
  };
};

// 创建token的secret
// accountInfo 账户信息
const createTokenSecret = accountInfo => {
  const { account } = accountInfo;
  const currentTime = Date.now();
  return `${currentTime}${account}`;
};


// 解析token
// token 需要解析的token
// secret 用于反解token的秘钥
const parseToken = (token) => {
  return new Promise((resolve, reject) => {
    const tokenArr = token.split('.');
    const account = tokenArr[0];
    const realToken = tokenArr.slice(1).join('.');
    const searchCondition = {
      fields: { account },
      order: 'updateTime',
      orderDirection: 'desc',
      limit: 1,
    };
    mySQL.queryItem(tableNames.token, searchCondition, 'secret,expiresTime')
      .then(result => {
        const { secret } = result[0];
        let errorMessage = null;
        jwt.verify(realToken, secret, (err, authData) => {
          if(err) {
            switch(err.message) {
              case 'jwt expired':
                errorMessage = 'token已过期,请重新登录';
                break;
              default: errorMessage = 'token无效,请重新登录';
            }
            reject(errorMessage);
          } else {
              resolve(authData);
          }
        });
      })
      .catch(err => {
        reject(err);
      });
  })
};

module.exports = {
  createTokenInfo,
  createTokenSecret,
  parseToken,
};
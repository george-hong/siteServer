const requestUtilities = require('../../common/requestUtilities');
const mySQL = require('../../mySQL/index');
const USER_TABLE_NAME = 'user';

const userHandler = {
  // 注册
  sign(requestData, request) {
    return new Promise((resolve, reject) => {
      const signFields = ['account', 'password', 'userName'];
      const signData = requestUtilities.extractFieldsAsAObject(requestData, signFields);
      mySQL.insert(USER_TABLE_NAME, signData)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },
  // 校验用户名是否存在
  checkAccountIsRepeat(requestData, request) {
    return new Promise((resolve, reject) => {
      const accountField = 'account';
      mySQL.queryItem(USER_TABLE_NAME, {
        fields: { [accountField]: requestData[accountField] }
      })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },
  // 登录
  login(requestData, request) {
    return new Promise((resolve, reject) => {
      const accountField = 'account';
      const passwordField = 'password';
      mySQL.queryItem(USER_TABLE_NAME, {
        fields: {
          [accountField]: requestData[accountField],
          [passwordField]: requestData[passwordField]
        }
      }, 'id,account')
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },
};

module.exports = userHandler;
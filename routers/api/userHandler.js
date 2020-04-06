const requestUtilities = require('../../common/requestUtilities');
const mySQL = require('../../mySQL/index');
const USER_TABLE_NAME = 'user';

const userHandler = {
  // 注册
  sign(request) {
    return new Promise((resolve, reject) => {
      const { body } = request;
      const signFields = ['account', 'password', 'userName'];
      const signData = requestUtilities.extractFieldsAsAObject(body, signFields);
      mySQL.insert(USER_TABLE_NAME, signData)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },

};

module.exports = userHandler;
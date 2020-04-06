const requestUtilities = require('../../common/requestUtilities');
const mySQL = require('../../mySQL/index');
const USER_TABLE_NAME = 'user';

const userHandler = {
  sign(requestData, request) {
    return new Promise((resolve, reject) => {
      const signFields = ['account', 'password', 'userName'];
      const signData = requestUtilities.extractFieldsAsAObject(requestData, signFields);
      mySQL.insert(USER_TABLE_NAME, signData)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },
  checkAccountIsRepeat(requestData, request) {
    return new Promise((resolve, reject) => {
      const accountField = 'account';
      mySQL.queryItem(USER_TABLE_NAME, accountField, requestData[accountField])
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
};

module.exports = userHandler;
//返回各种状态字符串
const createResponseData = (code, data = null) => {
  const dealResult = {
    code,
    data,
  };
  switch (code) {
    case 200:
      // 成功
      dealResult.message = 'success';
      break;
    case 302:
      dealResult.message = 'need-login';
      break;
    case 403:
      // 没有权限
      dealResult.message = 'forbbiden';
      break;
    case 500:
      // 服务异常
      dealResult.message = 'server-error';
      dealResult.data = null;
      dealResult.errDetail = String(data);
      console.log('--------------------- err info ---------------------');
      console.log(data);
      
      break;
    default: dealResult.message = '';
  }
  return dealResult;
};

// 抽取对象中的一部分字段生成一个新对象
  // object 需要抽取字段的对象
  // fields {Array, String} 需要抽取的字段，如果是String则以逗号分隔
 const extractFieldsAsAObject = (object, fields) => {
    const result = [];
    let fieldsArr = fields;
    if (typeof fields === 'string') {
      fieldsArr = fields.split(',');
    }
    fieldsArr.forEach(fieldName => {
      const value = object[fieldName];
      result[fieldName] = value;
    });
    return result;
  }

module.exports = {
  createResponseData,
  extractFieldsAsAObject,
};
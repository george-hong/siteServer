//返回各种状态字符串
const createResponseData = (code, data = null) => {
  console.log('data err');
  console.log(data);
  
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
}

module.exports = {
  createResponseData,
};
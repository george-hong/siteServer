import { requestParamsField, responseContainerField } from '../apiRouter/fieldConfig';
// 根据不同的请求类型 将请求参数设置到统一的字段,并将响应对象添加初始值
const parseRequestData = (request, response, next) => {
  const { method, query, body } = request;
  let requestParams = null;
  switch (method) {
    case 'GET':
      requestParams = query;
      break;
    case 'POST':
      requestParams = body;
      break;
    default: requestParams = {};
  }
  request[requestParamsField] = requestParams;
  response[responseContainerField] = {
    status: 404,
    data: '没有找到对应资源',
  };
  next();
};

export default parseRequestData;
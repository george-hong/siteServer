import { responseContainerField } from '../../mySQL/config';
import { createResponseData } from '../utilities/serverUtilities';

// 将存储在response指定字段中的内容作为响应发送
const sendData = (request, response, next) => {
  const { [responseContainerField]: responseData } = response;
  const result = { code: 500, result: null };
  if (responseData) {
    result.code = responseData.code;
    result.data = responseData.data;
  }
  response.send(createResponseData(result.code, result.data));
};

export default sendData;
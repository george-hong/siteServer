import { parseToken } from '../../../utilities/tokenUtilities';
import { createResponseData } from '../../../utilities/serverUtilities';
// TODO 在校验token时，当临近过期时，应跟新token
// TODO 应增加定时删除过期token的
// 如果token可用执行next,否则返回错误码及信息
const checkAndUpdateToken = async (request, response, next) => {
  const { token } = request.headers;
  try {
    await parseToken(token);
    next();
  } catch (err) {
    const errorResponse = createResponseData(401, err)
    response.status(errorResponse.status).send(errorResponse.body);
  }
};

export default checkAndUpdateToken;
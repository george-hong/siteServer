import mySQL from '../../../../mySQL/index';
import { createTokenInfo } from '../../../utilities/tokenUtilities';
import { tableNames, requestParamsField, responseContainerField } from '../../../../mySQL/config';

// 如果查询到则返回账号相关字段，否则返回Null
const checkAccountIsRepeat = async(request, response, next) => {
  const { [requestParamsField]: requestParams } = request;
  const { [responseContainerField]: responseContainer } = response;
  const accountField = 'account';
  try {
    const [queryResult] = await mySQL.queryItem(tableNames.user, {
      fields: { [accountField]: requestParams[accountField] },
      limit: 1,
    }, 'id,account,userName,avatar,backgroundImage,introduction');
    // 登录成功后生成jwt
    let token = null;
    if (queryResult) {
      const { account, userName } = queryResult;
      const payload = {
        account,
        userName,
      };
      const { token: tokenValue, secret, expiresTime } = createTokenInfo(payload);
      // 将token相关信息存入数据库
      const tokenInfo = {
        account,
        secret,
        expiresTime,
      };
      token = {
        tokenValue,
        expiresTime,
      };
      await mySQL.insert(tableNames.token, tokenInfo);
      queryResult.userId = queryResult.id;
      delete queryResult.id;
    }
    responseContainer.status = 200;
    responseContainer.data = {
      accountInfo: queryResult || null,
      token,
    };
  } catch (err) {
    responseContainer.data = err;
  }
  next();
};

export default checkAccountIsRepeat;
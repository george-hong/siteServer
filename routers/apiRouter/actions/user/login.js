import mySQL from '../../../../mySQL/index';
import { tableNames, requestParamsField, responseContainerField } from '../../../../mySQL/config';

// 如果查询到则返回账号相关字段，否则返回Null
const checkAccountIsRepeat = async(request, response, next) => {
  const { [requestParamsField]: requestParams } = request;
  const { [responseContainerField]: responseContainer } = response;
  const accountField = 'account';
  try {
    const queryResult = await mySQL.queryItem(tableNames.user, {
      fields: { [accountField]: requestParams[accountField] }
    }, 'id,account,userName');
    responseContainer.code = 200;
    responseContainer.data = {
      accountInfo: queryResult[0] || null,
    };
  } catch (err) {
    responseContainer.data = err;
  }
  next();
};

export default checkAccountIsRepeat;
import mySQL from '../../../../mySQL/index';
import { tableNames, requestParamsField, responseContainerField } from '../../../../mySQL/config';

const checkAccountIsRepeat = async(request, response, next) => {
  const { [requestParamsField]: requestParams } = request;
  const { [responseContainerField]: responseContainer } = response;
  const accountField = 'account';
  try {
    const queryResult = await mySQL.queryItem(tableNames.user, {
      fields: { [accountField]: requestParams[accountField] }
    });
    const isExist = !!queryResult && !!queryResult.length;

    responseContainer.code = 200;
    responseContainer.data = { isExist };
  } catch (err) {
    responseContainer.data = err;
  }
  next();
};

export default checkAccountIsRepeat;
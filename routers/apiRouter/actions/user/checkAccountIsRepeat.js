import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, responseContainerField } from '../../fieldConfig';

const checkAccountIsRepeat = async(request, response, next) => {
  const { [requestParamsField]: requestParams } = request;
  const { [responseContainerField]: responseContainer } = response;
  const accountField = 'account';
  try {
    const queryResult = await mySQL.queryItem(tableNames.user, {
      fields: { [accountField]: requestParams[accountField] },
      limit: 1,
    });
    const isExist = !!queryResult && !!queryResult.length;

    responseContainer.status = 200;
    responseContainer.data = { isExist };
  } catch (err) {
    responseContainer.data = err;
  }
  next();
};

export default checkAccountIsRepeat;
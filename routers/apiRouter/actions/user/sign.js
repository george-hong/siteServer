import mySQL from '../../../../mySQL/index';
import { tableNames, requestParamsField, responseContainerField } from '../../../../mySQL/config';
import { extractFieldsAsAObject } from '../../../utilities/serverUtilities';

const checkAccountIsRepeat = async(request, response, next) => {
  const { [requestParamsField]: requestParams } = request;
  const { [responseContainerField]: responseContainer } = response;
  const signFields = ['account', 'password', 'userName'];
  const signData = extractFieldsAsAObject(requestParams, signFields);
  try {
    const insertResult = await mySQL.insert(tableNames.user, signData);
    responseContainer.status = 200;
    responseContainer.data = insertResult;
  } catch (err) {
    responseContainer.data = err;
  }
  next();
};

export default checkAccountIsRepeat;
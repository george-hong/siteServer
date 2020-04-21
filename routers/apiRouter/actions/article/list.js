import mySQL from '../../../../mySQL/index';
import { tableNames, requestParamsField, responseContainerField } from '../../../../mySQL/config';
import { extractFieldsAsAObject } from '../../../utilities/serverUtilities';

const queryArticle = async(request, response, next) => {
  const { [requestParamsField]: requestParams } = request;
  const { [responseContainerField]: responseContainer } = response;
  const fields = ['page', 'pageSize'];
  const queryObject = extractFieldsAsAObject(requestParams, fields);
  try {
    const { page, pageSize } = queryObject;
    const queryResult = await mySQL.queryList(tableNames.article, {
      page,
      pageSize,
    }, '*');
    responseContainer.status = 200;
    responseContainer.data = queryResult;
  } catch (err) {
    responseContainer.data = err;
  }
  next();
};

export default queryArticle;
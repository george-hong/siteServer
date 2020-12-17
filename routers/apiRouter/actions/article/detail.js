import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject } from '../../../utilities/serverUtilities';
import { decodeQuotationMarks } from '../../../utilities/methods';

const queryArticle = async(request, response, next) => {
  const { [requestParamsField]: requestParams } = request;
  const { [responseContainerField]: responseContainer } = response;
  const fields = ['id'];
  const queryObject = extractFieldsAsAObject(requestParams, fields);
  try {
    const [queryResult] = await mySQL.queryItem(tableNames.article, {
      fields: queryObject,
      limit: 1,
    }, '*');
    // 转换单引号
    queryResult.content = decodeQuotationMarks(queryResult.content);
    responseContainer.status = 200;
    responseContainer.data = queryResult;
  } catch (err) {
    responseContainer.data = err;
  }
  next();
};

export default queryArticle;
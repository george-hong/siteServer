import mySQL from '../../../../mySQL/index';
import { tableNames, requestParamsField, responseContainerField } from '../../../../mySQL/config';
import { extractFieldsAsAObject } from '../../../utilities/serverUtilities';

const editArticle = async(request, response, next) => {
  const { [requestParamsField]: requestParams } = request;
  const { [responseContainerField]: responseContainer } = response;
  const fields = ['title', 'content', 'author', 'authorId'];
  const dataToInsert = extractFieldsAsAObject(requestParams, fields);
  dataToInsert.createTime = dataToInsert.updateTime = Date.now().valueOf();
  try {
    const insertResult = await mySQL.insertThenBackId(tableNames.article, dataToInsert);
    responseContainer.status = 200;
    responseContainer.data = insertResult;
  } catch (err) {
    responseContainer.data = err;
  }
  next();
};

export default editArticle;
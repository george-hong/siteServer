import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject } from '../../../utilities/serverUtilities';

const queryArticle = async (request, response, next) => {
    const { [requestParamsField]: requestParams } = request;
    const { [responseContainerField]: responseContainer } = response;
    const fields = ['page', 'pageSize', 'authorId'];
    const queryObject = extractFieldsAsAObject(requestParams, fields);
    try {
        const { page, pageSize, authorId } = queryObject;
        const searchCondition = { page, pageSize };
        // 如果有作者id则添加
        if (authorId >= 0) {
            searchCondition.fields = {
                authorId
            };
        }
        const queryResult = await mySQL.queryList(tableNames.article, searchCondition, '*');
        responseContainer.status = 200;
        responseContainer.data = queryResult;
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default queryArticle;
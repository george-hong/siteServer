import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject } from '../../../utilities/serverUtilities';

const queryDictionaryList = async (request, response, next) => {
    const { [requestParamsField]: requestParams } = request;
    const { [responseContainerField]: responseContainer } = response;
    const fields = ['page', 'pageSize', 'keyword', 'status'];
    const queryObject = extractFieldsAsAObject(requestParams, fields);
    try {
        const { page, pageSize, keyword, status } = queryObject;
        const searchCondition = { page, pageSize };
        const fields = {};
        // 如果有搜索关键字
        if (keyword) {
            searchCondition.search = `name LIKE '%${ keyword }%'`;
        }
        // 如果需要过滤文章状态
        if (status) {
            fields.status = status;
        }
        if (JSON.stringify(fields) !== '{}') searchCondition.fields = fields;
        const queryResult = await mySQL.queryList(tableNames.dictionary, searchCondition, '*');
        responseContainer.status = 200;
        responseContainer.data = queryResult;
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default queryDictionaryList;
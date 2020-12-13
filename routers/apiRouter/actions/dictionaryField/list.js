import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject } from '../../../utilities/serverUtilities';

const queryDictionaryFieldList = async (request, response, next) => {
    const { [requestParamsField]: requestParams } = request;
    const { [responseContainerField]: responseContainer } = response;
    const fields = ['dicId', 'page', 'pageSize', 'status'];
    const queryObject = extractFieldsAsAObject(requestParams, fields);
    try {
        const { dicId, page, pageSize, status } = queryObject;
        const searchCondition = { page, pageSize };
        const fields = [];
        // 过滤字段状态
        fields.push({
            key: 'dicId',
            value: dicId - 0
        });
        // 过滤字段状态
        if (status) {
            fields.push({
                key: 'status',
                value: status
            });
        }
        if (fields.length) searchCondition.fields = fields;
        const queryResult = await mySQL.queryList(tableNames.dictionaryField, searchCondition, '*');
        responseContainer.status = 200;
        responseContainer.data = queryResult;
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default queryDictionaryFieldList;
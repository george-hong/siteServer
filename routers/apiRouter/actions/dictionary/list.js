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
        const { page, pageSize, keyword } = queryObject;
        const searchCondition = { page, pageSize, order: 'updateTime' };
        const fields = [];
        // 如果有搜索关键字
        if (keyword) {
            fields.push({
                key: 'name',
                value: `%${ keyword }%`,
                condition: 'LIKE'
            });
        }
        // 过滤字典状态、默认取未删除的字典
        fields.push({
            key: 'status',
            value: 'on'
        })
        if (fields.length) searchCondition.fields = fields;

        const queryResult = await mySQL.queryList(tableNames.dictionary, searchCondition, '*');
        responseContainer.status = 200;
        responseContainer.data = queryResult;
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default queryDictionaryList;
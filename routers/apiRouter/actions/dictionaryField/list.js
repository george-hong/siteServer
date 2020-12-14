import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, requestTokenInfoContainerField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject, throwErrorMessageOnResponse } from '../../../utilities/serverUtilities';

const queryDictionaryFieldList = async (request, response, next) => {
    const { [requestParamsField]: requestParams, [requestTokenInfoContainerField]: tokenExtraInfo } = request;
    const { [responseContainerField]: responseContainer } = response;
    const fields = ['dicId', 'page', 'pageSize', 'status'];
    const queryObject = extractFieldsAsAObject(requestParams, fields);
    const { id: userIdFromToken } = tokenExtraInfo;
    try {
        const { dicId, page, pageSize, status } = queryObject;
        const searchCondition = { page, pageSize, order: 'weight' };
        const dictionaryInfo = await mySQL.queryItem(tableNames.dictionary, { fields: { id: dicId } }, 'userId,isPublic');
        if (!dictionaryInfo || !dictionaryInfo.length) throwErrorMessageOnResponse(response, '没有相关字段信息');
        if ((dictionaryInfo[0].isPublic === '0') && (dictionaryInfo[0].userId !== userIdFromToken)) throwErrorMessageOnResponse(response, '该字典内容不公开');
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
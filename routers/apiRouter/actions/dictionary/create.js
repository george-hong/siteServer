import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, requestTokenInfoContainerField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject, createErrorMessageOnResponse } from '../../../utilities/serverUtilities';

const create = async (request, response, next) => {
    const { [requestParamsField]: requestParams, [requestTokenInfoContainerField]: tokenExtraInfo } = request;
    const { [responseContainerField]: responseContainer } = response;
    const { id: userIdFromToken } = tokenExtraInfo;
    const fields = ['name', 'sign', 'description'];
    try {
        const dataToInsert = extractFieldsAsAObject(requestParams, fields);
        dataToInsert.userId = userIdFromToken;
        const repeatDictionary = await mySQL.queryItem(tableNames.dictionary, { fields: { name: dataToInsert.name, status: 'on' } }, 'id');
        if (repeatDictionary && repeatDictionary.length) createErrorMessageOnResponse(response, '字典名称重复');
        const insertResult = await mySQL.insertThenBackId(tableNames.dictionary, dataToInsert);
        responseContainer.status = 200;
        responseContainer.data = insertResult;
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default create;
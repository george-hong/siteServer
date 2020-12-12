import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, requestTokenInfoContainerField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject, throwErrorMessageOnResponse } from '../../../utilities/serverUtilities';
import { getCurrentTime } from '../../../utilities/time';

const create = async (request, response, next) => {
    const { [requestParamsField]: requestParams, [requestTokenInfoContainerField]: tokenExtraInfo } = request;
    const { [responseContainerField]: responseContainer } = response;
    const { id: userIdFromToken } = tokenExtraInfo;
    const fields = ['name', 'sign', 'description'];
    try {
        const dataToInsert = extractFieldsAsAObject(requestParams, fields);
        dataToInsert.userId = userIdFromToken;
        dataToInsert.createTime = dataToInsert.updateTime = getCurrentTime();
        const repeatDictionary = await mySQL.queryItem(tableNames.dictionary, { fields: { name: dataToInsert.name, status: 'on' } }, 'id');
        if (repeatDictionary && repeatDictionary.length) throwErrorMessageOnResponse(response, '字典名称重复');
        const insertResult = await mySQL.insertThenBackId(tableNames.dictionary, dataToInsert);
        responseContainer.status = 200;
        responseContainer.data = insertResult;
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default create;
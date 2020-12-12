import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, requestTokenInfoContainerField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject, throwErrorMessageOnResponse } from '../../../utilities/serverUtilities';

const deleteDictionaryField = async (request, response, next) => {
    const { [requestParamsField]: requestParams, [requestTokenInfoContainerField]: tokenExtraInfo } = request;
    const { [responseContainerField]: responseContainer } = response;
    const { id: userIdFromToken } = tokenExtraInfo;
    const fields = ['id', 'fieldName', 'fieldCode', 'fieldExtraCode', 'remark'];
    const fullParams = extractFieldsAsAObject(requestParams, fields);
    try {
        const { id, ...updateInfo } = fullParams;
        const dataToUpdate = { ...updateInfo };
        const oldDictionaryFieldItem = await mySQL.queryItem(tableNames.dictionaryField, { fields: { id: fullParams.id } }, 'userId');
        if (!oldDictionaryFieldItem || !oldDictionaryFieldItem.length) throwErrorMessageOnResponse(response, '需要编辑的字典不存在');
        if (oldDictionaryFieldItem[0].userId !== userIdFromToken) throwErrorMessageOnResponse(response, '您没有权限');
        const updateResult = await mySQL.updateItem(tableNames.dictionaryField, { fields: { id: fullParams.id } }, dataToUpdate);
        responseContainer.status = 200;
        responseContainer.data = updateResult;
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default deleteDictionaryField;
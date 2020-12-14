import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, requestTokenInfoContainerField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject, throwErrorMessageOnResponse } from '../../../utilities/serverUtilities';

const deleteDictionary = async (request, response, next) => {
    const { [requestParamsField]: requestParams, [requestTokenInfoContainerField]: tokenExtraInfo } = request;
    const { [responseContainerField]: responseContainer } = response;
    const { id: userIdFromToken } = tokenExtraInfo;
    const fields = ['id', 'name', 'description', 'isPublic'];
    const fullParams = extractFieldsAsAObject(requestParams, fields);
    try {
        const { id, ...updateInfo } = fullParams;
        const dataToUpdate = { ...updateInfo };
        const oldDictionaryItem = await mySQL.queryItem(tableNames.dictionary, { fields: { id: fullParams.id } }, 'userId');
        if (!oldDictionaryItem || !oldDictionaryItem.length) throwErrorMessageOnResponse(response, '需要编辑的字典不存在');
        if (oldDictionaryItem[0].userId !== userIdFromToken) throwErrorMessageOnResponse(response, '您没有权限');
        const updateResult = await mySQL.updateItem(tableNames.dictionary, { fields: { id: fullParams.id } }, dataToUpdate);
        responseContainer.status = 200;
        responseContainer.data = updateResult;
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default deleteDictionary;
import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, requestTokenInfoContainerField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject, throwErrorMessageOnResponse } from '../../../utilities/serverUtilities';

const update = async (request, response, next) => {
    const { [requestParamsField]: requestParams, [requestTokenInfoContainerField]: tokenExtraInfo } = request;
    const { [responseContainerField]: responseContainer } = response;
    const { id: userIdFromToken } = tokenExtraInfo;
    const fields = ['id', 'fileName'];
    const fullParams = extractFieldsAsAObject(requestParams, fields);
    const { tags } = requestParams;
    try {
        const { id, ...updateInfo } = fullParams;
        const dataToUpdate = { ...updateInfo, tags };
        const oldPhotoItem = await mySQL.queryItem(tableNames.uploadFile, { fields: { id: fullParams.id } }, 'uploaderId');
        if (!oldPhotoItem || !oldPhotoItem.length) throwErrorMessageOnResponse(response, '需要更新的图片不存在');
        if (oldPhotoItem[0].uploaderId !== userIdFromToken) throwErrorMessageOnResponse(response, '您没有权限');
        const updateResult = await mySQL.updateItem(tableNames.uploadFile, { fields: { id: fullParams.id } }, dataToUpdate);
        responseContainer.status = 200;
        responseContainer.data = updateResult;
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default update;
import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, requestTokenInfoContainerField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject, createErrorMessageOnResponse } from '../../../utilities/serverUtilities';

const changeStatus = async (request, response, next) => {
    const { [requestParamsField]: requestParams, [requestTokenInfoContainerField]: tokenExtraInfo } = request;
    const { [responseContainerField]: responseContainer } = response;
    const { id: userIdFromToken } = tokenExtraInfo;
    const fields = ['status', 'id'];
    const fullParams = extractFieldsAsAObject(requestParams, fields);
    try {
        const dataToUpdate = { status: fullParams.status };
        const oldArticleItem = await mySQL.queryItem(tableNames.article, { fields: { id: fullParams.id } }, 'authorId');
        if (!oldArticleItem || !oldArticleItem.length) createErrorMessageOnResponse(response, '文章不存在');
        if (oldArticleItem[0].authorId !== userIdFromToken) createErrorMessageOnResponse(response, '您不是文章作者，无法变更状态');
        const updateResult = await mySQL.updateItem(tableNames.article, { fields: { id: fullParams.id } }, dataToUpdate);
        responseContainer.status = 200;
        responseContainer.data = updateResult;
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default changeStatus;
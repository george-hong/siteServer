import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, requestTokenInfoContainerField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject, throwErrorMessageOnResponse } from '../../../utilities/serverUtilities';
import { encodeQuotationMarks } from '../../../utilities/methods';

const editArticle = async (request, response, next) => {
    const { [requestParamsField]: requestParams, [requestTokenInfoContainerField]: tokenExtraInfo } = request;
    const { [responseContainerField]: responseContainer } = response;
    const { id: userIdFromToken } = tokenExtraInfo;
    const fields = ['title', 'content', 'author', 'category', 'id'];
    const fullParams = extractFieldsAsAObject(requestParams, fields);
    if (fullParams.id === undefined) {
        // 新增
        const dataToInsert = extractFieldsAsAObject(requestParams, fields.slice(0, fields.length - 1));
        dataToInsert.createTime = dataToInsert.updateTime = Date.now().valueOf();
        dataToInsert.authorId = userIdFromToken;
        try {
            const insertResult = await mySQL.insertThenBackId(tableNames.article, dataToInsert);
            responseContainer.status = 200;
            responseContainer.data = insertResult;
        } catch (err) {
            responseContainer.data = err;
        }
    } else {
        // 编辑
        const updateFields = ['title', 'content', 'category'];
        const dataToUpdate = extractFieldsAsAObject(requestParams, updateFields);
        // 转换单引号
        dataToUpdate.content = encodeQuotationMarks(dataToUpdate.content);
        dataToUpdate.updateTime = Date.now().valueOf();
        try {
            const oldArticleItem = await mySQL.queryItem(tableNames.article, { fields: { id: fullParams.id } }, 'authorId');
            if (!oldArticleItem || !oldArticleItem.length) throwErrorMessageOnResponse(response, '文章不存在');
            if (oldArticleItem[0].authorId !== userIdFromToken) throwErrorMessageOnResponse(response, '您不是文章作者，无法编辑');
            const updateResult = await mySQL.updateItem(tableNames.article, { fields: { id: fullParams.id } }, dataToUpdate);
            responseContainer.status = 200;
            responseContainer.data = updateResult;
        } catch (err) {
            responseContainer.data = err;
        }
    }
    next();
};

export default editArticle;
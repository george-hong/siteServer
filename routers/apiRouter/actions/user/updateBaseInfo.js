import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject } from '../../../utilities/serverUtilities';

const updateBaseInfo = async(request, response, next) => {
    const { [requestParamsField]: requestParams } = request;
    const { [responseContainerField]: responseContainer } = response;
    const fields = ['userId', 'userName', 'introduction', 'albumDicId'];
    const queryObject = extractFieldsAsAObject(requestParams, fields);
    try {
        const { userId, ...updateFields } = queryObject;
        const { userName, introduction } = updateFields;
        // 更新用户表
        const updateResult = await mySQL.updateItem(tableNames.user, {
            fields: {
                id: userId
            },
        }, updateFields);
        // 更新文章表
        if (userName) {
            await mySQL.updateGroup(tableNames.article, {
                fields: {
                    authorId: userId
                },
            }, {
                author: userName
            })
        }
        responseContainer.status = 200;
        responseContainer.data = {
            userName,
            introduction
        };
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default updateBaseInfo;
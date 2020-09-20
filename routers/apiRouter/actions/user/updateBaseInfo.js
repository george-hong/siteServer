import mySQL from '../../../../mySQL/index';
import { tableNames, requestParamsField, responseContainerField } from '../../../../mySQL/config';
import { extractFieldsAsAObject } from '../../../utilities/serverUtilities';

const updateBaseInfo = async(request, response, next) => {
    const { [requestParamsField]: requestParams } = request;
    const { [responseContainerField]: responseContainer } = response;
    const fields = ['userId', 'userName', 'introduction'];
    const queryObject = extractFieldsAsAObject(requestParams, fields);
    try {
        const { userId, userName, introduction } = queryObject;
        const updateResult = await mySQL.updateItem(tableNames.user, {
            fields: {
                id: userId
            },
        }, {
            userName,
            introduction
        });
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
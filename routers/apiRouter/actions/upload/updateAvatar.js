import mySQL from '../../../../mySQL/index';
import { tableNames, requestParamsField, responseContainerField } from '../../../../mySQL/config';
import { extractFieldsAsAObject } from '../../../utilities/serverUtilities';

const updateAvatar = async(request, response, next) => {
    const { [requestParamsField]: requestParams } = request;
    const { [responseContainerField]: responseContainer } = response;
    const fields = ['uploaderId'];
    const queryObject = extractFieldsAsAObject(requestParams, fields);
    try {
        const { url } = responseContainer.data;
        const { uploaderId } = queryObject;
        const updateResult = await mySQL.updateItem(tableNames.user, {
            fields: {
                id: uploaderId
            },
        }, {
            headerImage: url
        });
        responseContainer.status = 200;
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default updateAvatar;
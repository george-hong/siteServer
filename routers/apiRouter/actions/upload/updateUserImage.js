import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject } from '../../../utilities/serverUtilities';

const updateUserImage = async(request, response, next) => {
    const { [requestParamsField]: requestParams } = request;
    const { [responseContainerField]: responseContainer } = response;
    const fields = ['uploaderId', 'type'];
    const queryObject = extractFieldsAsAObject(requestParams, fields);
    try {
        const { url, type: saveField } = responseContainer.data;
        const { uploaderId } = queryObject;
        const updateResult = await mySQL.updateItem(tableNames.user, {
            fields: {
                id: uploaderId
            },
        }, {
            [saveField]: url
        });
        responseContainer.status = 200;
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default updateUserImage;
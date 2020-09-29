import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject } from '../../../utilities/serverUtilities';

const getUploadFilesByUser = async(request, response, next) => {
    const { [requestParamsField]: requestParams } = request;
    const { [responseContainerField]: responseContainer } = response;
    const fields = ['uploaderId', 'type'];
    const queryObject = extractFieldsAsAObject(requestParams, fields);
    try {
        const { uploaderId, type } = queryObject;
        const queryResult = await mySQL.queryList(tableNames.uploadFile, {
            fields: {
                uploaderId,
                type
            },
            pageSize: 999
        }, '*');
        responseContainer.status = 200;
        responseContainer.data = queryResult;
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default getUploadFilesByUser;
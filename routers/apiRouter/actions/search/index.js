import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject } from '../../../utilities/serverUtilities';

const search = async (request, response, next) => {
    const { [requestParamsField]: requestParams } = request;
    const { [responseContainerField]: responseContainer } = response;
    const fields = ['keyword'];
    const queryObject = extractFieldsAsAObject(requestParams, fields);
    try {
        const { keyword } = queryObject;
        const queryResult = await mySQL.querySearch(tableNames.article, {
            fields: { status: 'on' },
            search: `title LIKE '%${ keyword }%'`
        }, '*');
        responseContainer.status = 200;
        responseContainer.data = queryResult;
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default search;
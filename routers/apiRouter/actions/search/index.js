import mySQL from '../../../../mySQL/index';
import {tableNames, requestParamsField, responseContainerField} from '../../../../mySQL/config';
import {extractFieldsAsAObject} from '../../../utilities/serverUtilities';

const search = async (request, response, next) => {
    const {[requestParamsField]: requestParams} = request;
    const {[responseContainerField]: responseContainer} = response;
    const fields = ['keyword'];
    const queryObject = extractFieldsAsAObject(requestParams, fields);
    try {
        const { keyword } = queryObject;
        const queryResult = await mySQL.querySearch(tableNames.article, {
            search: `title LIKE '%${keyword}%'`
        }, '*');
        responseContainer.status = 200;
        responseContainer.data = queryResult;
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default search;
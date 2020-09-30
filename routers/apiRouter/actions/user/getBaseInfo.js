import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject } from "../../../utilities/serverUtilities";

// 如果查询到则返回账号信息，否则返回Null
const getBaseInfo = async (request, response, next) => {
    const { [requestParamsField]: requestParams } = request;
    const { [responseContainerField]: responseContainer } = response;
    const fields = ['account', 'password'];
    const queryObject = extractFieldsAsAObject(requestParams, fields);
    try {
        const { account } = queryObject;
        let [queryResult] = await mySQL.queryItem(tableNames.user, {
            fields: { account },
            limit: 1,
        }, '*');
        if (queryResult) delete queryResult.password;
        responseContainer.status = 200;
        responseContainer.data = {
            accountInfo: queryResult || null,
        };
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default getBaseInfo;
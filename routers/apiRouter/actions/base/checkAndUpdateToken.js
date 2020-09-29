/**
 * 解析token信息并添加到指定字段
 */
import { createTokenInfo, parseToken } from '../../../utilities/tokenUtilities';
import { createResponseData } from '../../../utilities/serverUtilities';
import { requestTokenInfoContainerField, responseNewTokenContainerField } from '../../fieldConfig';
import projectConfig from '../../../../config/config';
import mySQL from '../../../../mySQL';
import { tableNames } from '../../../../mySQL/config';
// TODO 在校验token时，当临近过期时，应跟新token
// 如果token可用执行next,否则返回错误码及信息
const checkAndUpdateToken = async (request, response, next) => {
    const { token } = request.headers;
    try {
        const tokenInfo = await parseToken(token);
        const { exp: tokenExpiresTime, iat, ...tokenExtraInfo } = tokenInfo;
        const timeShouldUpdateToken = tokenExpiresTime - (60 * projectConfig.tokenShouldUpdateMinutes);
        const currentTime = Math.floor(Date.now() / 1000);
        if ((currentTime < tokenExpiresTime) && (currentTime > timeShouldUpdateToken)) {
            const payload = {
                account: tokenInfo.account,
                id: tokenInfo.id
            };
            const { token: tokenValue, secret, expiresTime } = createTokenInfo(payload);
            // 将token相关信息存入数据库
            const newTokenInfo = {
                userId: tokenInfo.id,
                secret,
                expiresTime,
            };
            const newToken = {
                tokenValue,
                expiresTime
            };
            await mySQL.insert(tableNames.token, newTokenInfo);
            response[responseNewTokenContainerField] = newToken;
        }
        request[requestTokenInfoContainerField] = tokenExtraInfo;
        next();
    } catch (err) {
        const errorResponse = createResponseData(401, err)
        response.status(errorResponse.status).send(errorResponse.body);
    }
};

export default checkAndUpdateToken;
export const requestParamsField = 'requestParams';          // 请求上用于统一暂存请求参数的字段
export const requestTokenInfoContainerField = 'tokenInfo';  // 请求体用于暂存token信息的字段
export const responseContainerField = 'body';               // response上用于暂存响应内容的字段
export const responseNewTokenContainerField = 'newToken';   // 响应中存储新的token信息的字段

const config = {
    requestParamsField,
    requestTokenInfoContainerField,
    responseContainerField,
    responseNewTokenContainerField
};

export default config;
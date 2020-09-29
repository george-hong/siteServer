//返回各种状态字符串
export const createResponseData = (status, data = null) => {
    const dealResult = {
        status: 200,
        body: {
            data,
            status,
        }
    };
    switch (status) {
        case 200:
            // 成功
            dealResult.message = 'success';
            break;
        case 302:
            dealResult.message = 'need-login';
            break;
        case 401:
            // 没有权限
            dealResult.message = 'token-expired';
            break;
        case 403:
            // 没有权限
            dealResult.message = 'forbidden';
            break;
        case 404:
            // 没有对应接口
            dealResult.message = 'bad-request';
            break;
        case 500:
            // 服务异常
            dealResult.message = 'server-error';
            break;
        default:
            dealResult.message = '';
    }
    if (status !== 200) {
        dealResult.body.data.responseData = null;
        dealResult.body.errDetail = String(data);
        console.log('--------------------- err info ---------------------');
        console.log(data);
    }
    return dealResult;
};

// 抽取对象中的一部分字段生成一个新对象
// object 需要抽取字段的对象
// fields {Array, String} 需要抽取的字段，如果是String则以逗号分隔
export const extractFieldsAsAObject = (object, fields) => {
    const result = [];
    let fieldsArr = fields;
    if (typeof fields === 'string') {
        fieldsArr = fields.split(',');
    }
    fieldsArr.forEach(fieldName => {
        const value = object[fieldName];
        result[fieldName] = value;
    });
    return result;
};

export const dealCatchError = error => {
    console.log('捕获异常:', error);
}

module.exports = {
    createResponseData,
    extractFieldsAsAObject,
    dealCatchError
};
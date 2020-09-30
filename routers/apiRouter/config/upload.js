const routerConfig = {
    // 上传文件
    '/': {
        method: 'post',
        actions: ['base/checkTokenParseInfo', 'upload/index'],
    },
    // 根据用户id获取上传的文件信息
    '/getUploadFilesByUser': {
        method: 'get',
        actions: ['base/checkTokenParseInfo', 'upload/getUploadFilesByUser']
    },
    // 更新头像信息
    '/updateUserImage': {
        method: 'post',
        actions: ['base/checkTokenParseInfo', 'upload/index', 'upload/updateUserImage']
    }
};

export default {
    routerConfig,
    moduleName: '/upload'
};
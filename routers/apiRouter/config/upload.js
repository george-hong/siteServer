const routerConfig = {
    // 上传文件
    '/': {
        method: 'post',
        actions: ['upload/index'],
    },
    // 根据用户id获取上传的文件信息
    '/getUploadFilesByUser': {
        method: 'get',
        actions: ['upload/getUploadFilesByUser']
    },
    // 更新头像信息
    '/updateUserImage': {
        method: 'post',
        actions: ['upload/index', 'upload/updateUserImage']
    }
};

export default {
    routerConfig,
    moduleName: '/upload'
};
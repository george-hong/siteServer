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
    }
};

export default {
    routerConfig,
    moduleName: '/upload'
};
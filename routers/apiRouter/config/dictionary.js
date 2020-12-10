const routerConfig = {
    '/create': { // 创建字典
        method: 'post',
        actions: ['base/checkTokenParseInfo', 'dictionary/create'],
    },
    '/list': { // 获取字典列表
        method: 'get',
        actions: ['dictionary/list'],
    }
};

export default {
    routerConfig,
    moduleName: '/dictionary'
};
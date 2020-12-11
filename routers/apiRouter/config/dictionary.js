const routerConfig = {
    '/create': { // 创建字典
        method: 'post',
        actions: ['base/checkTokenParseInfo', 'dictionary/create'],
    },
    '/update': { // 更新字典
        method: 'post',
        actions: ['base/checkTokenParseInfo', 'dictionary/update'],
    },
    '/list': { // 获取字典列表
        method: 'get',
        actions: ['dictionary/list'],
    },
    '/delete': { // 删除字典
        method: 'post',
        actions: ['base/checkTokenParseInfo', 'dictionary/delete'],
    }
};

export default {
    routerConfig,
    moduleName: '/dictionary'
};
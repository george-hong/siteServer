const routerConfig = {
    '/create': { // 创建字典字段
        method: 'post',
        actions: ['base/checkTokenParseInfo', 'dictionaryField/create'],
    },
    '/update': { // 更新字典字段
        method: 'post',
        actions: ['base/checkTokenParseInfo', 'dictionaryField/update'],
    },
    '/list': { // 获取字典字段列表
        method: 'get',
        actions: ['base/checkTokenParseInfo', 'dictionaryField/list'],
    },
    '/delete': { // 删除字典字段
        method: 'post',
        actions: ['base/checkTokenParseInfo', 'dictionaryField/delete'],
    }
};

export default {
    routerConfig,
    moduleName: '/dictionaryField'
};
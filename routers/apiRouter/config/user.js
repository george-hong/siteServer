const routerConfig = {
    '/checkAccountIsRepeat': { // 校验用户名是否重复
        method: 'get',
        actions: ['user/checkAccountIsRepeat'],
    },
    '/sign': { // 注册
        method: 'post',
        actions: ['user/sign'],
    },
    '/login': { // 登录
        method: 'post',
        actions: ['user/login'],
    },
    '/getBaseInfo': { // 获取用户基本信息
        method: 'get',
        actions: ['user/getBaseInfo'],
    },
    '/test': { // 测试
        method: 'post',
        actions: ['user/test'],
    },
    '/updateBaseInfo': { // 更新用户基础信息
        method: 'post',
        actions: ['base/checkTokenParseInfo', 'user/updateBaseInfo'],
    }
};

export default {
    routerConfig,
    moduleName: '/user'
};
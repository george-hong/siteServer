
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
  '/test': { // 测试
    method: 'post',
    actions: ['base/checkAndUpdateToken', 'user/test'],
  }
};

export default {
  routerConfig,
  moduleName: '/user'
};
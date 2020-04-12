
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
  }
};

export default {
  routerConfig,
  moduleName: '/user'
};
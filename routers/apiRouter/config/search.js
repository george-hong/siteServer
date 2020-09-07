const routerConfig = {
  '/': { // 搜索
    method: 'get',
    actions: ['search/index'],
  }
};

export default {
  routerConfig,
  moduleName: '/search'
};
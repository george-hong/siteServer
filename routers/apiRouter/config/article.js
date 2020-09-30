const routerConfig = {
  '/edit': { // 编辑文章
    method: 'post',
    actions: ['base/checkTokenParseInfo', 'article/edit'],
  },
  '/detail': { // 编辑详情
    method: 'get',
    actions: ['article/detail'],
  },
  '/list': { // 文章列表
    method: 'get',
    actions: ['article/list'],
  }
};

export default {
  routerConfig,
  moduleName: '/article'
};
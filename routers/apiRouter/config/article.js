
const routerConfig = {
  '/edit': { // 编辑文章
    method: 'post',
    actions: ['base/checkAndUpdateToken', 'article/edit'],
  },
  '/detail': { // 编辑文章
    method: 'get',
    actions: ['base/checkAndUpdateToken', 'article/detail'],
  }
};

export default {
  routerConfig,
  moduleName: '/article'
};
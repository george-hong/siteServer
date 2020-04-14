
const routerConfig = {
  '/edit': { // 编辑文章
    method: 'post',
    actions: ['base/checkAndUpdateToken', 'article/edit'],
  }
};

export default {
  routerConfig,
  moduleName: '/article'
};
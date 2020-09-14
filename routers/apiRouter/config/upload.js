const routerConfig = {
  '/': { // 上传文件
    method: 'post',
    actions: ['upload/index'],
  }
};

export default {
  routerConfig,
  moduleName: '/upload'
};
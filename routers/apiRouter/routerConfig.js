import userRouterConfig from './config/user';
import articleRouterConfig from './config/article';

// 自动添加前缀
const parseModuleRouterConfig = (moduleRouterConfig) => {
  const { routerConfig, moduleName } = moduleRouterConfig;
  return Object.keys(routerConfig).map(url => {
    const routerConfigItem = routerConfig[url];
    const urlResult = `${moduleName}${url}`;
    return {
      ...routerConfigItem,
      url: urlResult,
    };
  });
}

const routerConfig = [
  ...parseModuleRouterConfig(userRouterConfig),
  ...parseModuleRouterConfig(articleRouterConfig),
];

export default routerConfig;
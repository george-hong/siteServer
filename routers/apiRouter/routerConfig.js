import userRouterConfig from './config/user';
import articleRouterConfig from './config/article';
import searchRouterConfig from './config/search';

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
  ...parseModuleRouterConfig(searchRouterConfig),
];

export default routerConfig;
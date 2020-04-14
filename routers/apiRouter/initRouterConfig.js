import express from 'express';
import { isFunction } from '../../libs/utilMethods';

const configMemory = {};  // 用于缓存导入的方法

const isJavaScriptFile = (fileName) => {
  const regExp = /.js$/;
  return regExp.test(fileName);
};

// 将不同的action配置到configMemory对象上
const getConfigKeysObject = routerConfig => {
  const configKeysObject = {};
  routerConfig.forEach(config => {
    if (config) {
      const { actions } = config;
      if (actions && actions.length) {
        actions.forEach(action => configKeysObject[action] = true);
      }
    }
  });
  return configKeysObject;
}

const getActionPath = actionName => {
  return `${actionName}${isJavaScriptFile(actionName) ? '' : '.js'}`;
}

// 自动导入action文件
const importFunctionsToConfigMemory = (configKeysObject) => {
    const baseUrl = './actions/';
    Object.keys(configKeysObject).forEach(filePath => {
    const actionPath = getActionPath(filePath);
    const fileCompletePath = `${baseUrl}${actionPath}`;
    configMemory[actionPath] = require(fileCompletePath).default;
  });
}

// 配置并返回路由
const getRouter = (configMemory, routerConfig) => {
  const router = express.Router();
  routerConfig.forEach(config => {
    const { url, actions, method } = config;
    const requestMethod = method.toLowerCase();
    const requestUrl = url;
    const middlewareArr = [];
    if (actions && actions.length) {
      actions.forEach(actionName => {
        const actionPath = getActionPath(actionName);
        const currentAction = configMemory[actionPath];
        if (isFunction(currentAction)) {
          middlewareArr.push(currentAction);
        } else {
          throw new Error(`url: ${requestUrl} 的 action: ${actionName} 导出的不是一个函数,请检查`);
        }
      });
    } else {
      throw new Error(`${requestUrl} 未配置actions,请至少配置一项action`);
    }
    router[requestMethod](requestUrl, ...middlewareArr);
  });
  return router;
}

const initRouterConfig = (routerConfig) => {
  // 遍历路由中需要执行的action配置,并将key赋值到configKeysObject,避免后面重复导入;
  const configKeysObject = getConfigKeysObject(routerConfig);
  // 遍历导入js文件
  importFunctionsToConfigMemory(configKeysObject);
  // 将配置好的express.Router()实例返回
  return getRouter(configMemory, routerConfig);
};

export default initRouterConfig;
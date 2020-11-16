import express from 'express';
import path from 'path';
import fs from 'fs';
import https from 'https';
import history from  'connect-history-api-fallback';
import apiRouter from './routers';

const app = express();
const sslApp = express();
const port = 80;
const sslPort = 443;
// 重置index.html资源文件路径的方法
const organizeFilePath = context => {
  const pathArray = context.parsedUrl.pathname.split('/');
  const fileName = pathArray[pathArray.length - 1];
  return '/' + fileName;
}
const historyConfig = {
  rewrites: [
    {
      from: /main-.*\.(css|js)$/,
      to: organizeFilePath
    },
    {
      from: /.(ttf|woff)$/,
      to: organizeFilePath
    },
  ]
}

const setAppAllowCrossOrigin = (req,res,next) => {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type,token");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() === 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
}

const transformHttpToHttps = () => {
  // 转发http请求
  app.all('*', (req, res, next) => {
    let host = req.headers.host;
    host = host.replace(/\:\d+$/, '');
    res.redirect(`https://${host}${req.path}`);
  });
}

const setApplicationRouter = app => {
  app.all('*', setAppAllowCrossOrigin)
  app.use(apiRouter);
  app.use(history(historyConfig));
  app.use(express.static(path.join(__dirname, './app')));  // 静态资源
}

export const runProdServer = () => {
  const privateKey  = fs.readFileSync(path.join(__dirname, '../https/4509973_hongchangjun.top.key'), 'utf8');
  const certificate = fs.readFileSync(path.join(__dirname, '../https/4509973_hongchangjun.top.pem'), 'utf8');
  const sslOption = {
    key: privateKey,
    cert: certificate
  };

  transformHttpToHttps();
  setApplicationRouter(sslApp);

  const sslServer = https.createServer(sslOption, sslApp);
  app.listen(port);
  sslServer.listen(sslPort, () => console.log(`Application running on port ${sslPort}!`));
}

export const runDevServer = () => {
  setApplicationRouter(app);
  app.listen(port, () => console.log(`Development application running on port ${port}!`));
}

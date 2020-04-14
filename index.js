import express from 'express';
import path from 'path';
import apiRouter from './routers';

const app = express();

const port = 3000;

app.all('*',function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type,token");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
})

app.use(apiRouter);
app.use(express.static(path.join(__dirname, './app')));  // 静态资源


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
## mySQL
> WHERE 后的查询条件应为 key = 'value'的形式

## 使node支持import导入
> 1. npm install babel-cli -g //全局安装
> npm install babel-preset-es2015 --save-dev //安装该模块
> 2. .babelrc 添加配置
> {
>    "presets": [
>        "es2015"
>    ],
>    "plugins": []
> }
> 3. 启动命令更换为 babel-node [fileName]

## node报不支持自定义headers中的字段
> 在app中配置'Access-Control-Allow-Headers'的内容

## 状态码设置
> 1. 200 请求成功
> 2. 401 token失效
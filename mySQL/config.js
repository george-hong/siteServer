// 数据库配置
const sqlLoginInfo = {
  host     : 'hongchangjun.mysql.zhangbei.rds.aliyuncs.com',
  port     : 3306,
  user     : 'admini',
  password : 'Zxc916856595',
  database : 'site',
};

const tableNames = {
  user: 'user', // 用户表名称
};

const responseContainerField = 'body'; // response上用于暂存响应内容的字段
const requestParamsField = 'requestParams'; // 请求上用于统一暂存请求参数的字段

module.exports = {
  sqlLoginInfo,
  tableNames,
  responseContainerField,
  requestParamsField,
};
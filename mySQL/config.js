// 数据库配置
const sqlLoginInfo = {
    host: 'hongchangjun.mysql.zhangbei.rds.aliyuncs.com',
    port: 3306,
    user: 'admini',
    password: 'Zxc916856595',
    database: 'site',
};

const tableNames = {
    user: 'user',                   // 用户表名称
    token: 'token',                 // token表名称
    article: 'article',             // 文章表名称
    uploadFile: 'uploadFile',       // 上传文件表
};

module.exports = {
    sqlLoginInfo,
    tableNames
};
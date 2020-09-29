const config = {
    localSaveUploadFileRootFolder: '/app/upload',           // 本机保存上传文件在项目根目录中的位置
    serverReadUploadFileRootFolder: '/upload',              // 服务器读取上传文件在app目录中的位置
    tokenExpiresMinutes: 120,                               // token有效分钟数
    tokenShouldUpdateMinutes: 5,                            // token自动更新活跃分钟数
};

export default config;
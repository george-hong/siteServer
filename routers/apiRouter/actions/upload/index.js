import path from 'path';
import fs from 'fs';
import mySQL from '../../../../mySQL/index';
import formidable from 'formidable';
import moment from 'moment';
import { requestParamsField, responseContainerField, tableNames } from '../../../../mySQL/config';
import { getRandomCharts } from '../../../utilities/methods';
import globalConfig from '../../../../config/config';

const search = async (request, response, next) => {
    const {[responseContainerField]: responseContainer} = response;
    try {
        const form = new formidable.IncomingForm();
        const rootFolder = path.join(__dirname, `../../../..${globalConfig.localSaveUploadFileRootFolder}`);
        form.keepExtensions = true;
        form.multiples = true;
        form.uploadDir = rootFolder;
        const fileInfo = await new Promise((resolve, reject) => {
            form.parse(request, function(err,fields,files){
                if (err) {
                    reject(err);
                } else {
                    // 生成文件名、保存路径等信息
                    const time = moment().format('YYYYMMDDHHmmss');
                    let { path: saveFolder, uploaderId, type } = fields;
                    request[requestParamsField] = fields;
                    saveFolder = saveFolder ? `/${saveFolder}` : '';
                    const randomChart = getRandomCharts(10);
                    const extendName = path.extname(files.file.name);
                    const fileName = `${time}${randomChart}${extendName}`;
                    const oldPath = files.file.path;
                    const newPath = `${rootFolder}${saveFolder}/${fileName}`;
                    // 重新保存文件
                    fs.rename(oldPath, newPath, function(err){
                        if(err) reject(err);
                        else {
                            const fileInfo = {
                                fileName,
                                url: `${request.headers.origin}${globalConfig.serverReadUploadFileRootFolder}${saveFolder}/${fileName}`,
                                uploaderId,
                                type
                            };
                            resolve(fileInfo);
                        }
                    });
                }
            })
        });
        const dataToInsert = {
            fileName: fileInfo.fileName,
            url: fileInfo.url,
            uploaderId: fileInfo.uploaderId,
            type: fileInfo.type
        };
        const insertResult = await mySQL.insertThenBackId(tableNames.uploadFile, dataToInsert);
        responseContainer.status = 200;
        responseContainer.data = {
            ...insertResult,
            ...dataToInsert
        };
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default search;
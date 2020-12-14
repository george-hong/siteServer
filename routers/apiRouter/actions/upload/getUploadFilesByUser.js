import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject } from '../../../utilities/serverUtilities';
import dayjs from 'dayjs';

const getUploadFilesByUser = async(request, response, next) => {
    const { [requestParamsField]: requestParams } = request;
    const { [responseContainerField]: responseContainer } = response;
    const fields = ['uploaderId', 'type', 'filterType', 'filterValue'];
    const queryObject = extractFieldsAsAObject(requestParams, fields);
    try {
        const { uploaderId, type, filterType, filterValue } = queryObject;
        const fields = {
            uploaderId,
            type
        };
        const queryResult = await mySQL.queryList(tableNames.uploadFile, { fields, pageSize: 99999 }, '*');
        let conditionValue;
        try {
            conditionValue = JSON.parse(filterValue);
        } catch (err) {
            conditionValue = [];
        }
        if (conditionValue.length) {
            const { content } = queryResult;
            const result = [];
            // 按标签过滤
            if (filterType === 'tags') {
                content.forEach(fileInfo => {
                    let isIncludeAll = true;
                    const { tags } = fileInfo
                    if (!tags) return;
                    const tagsList = tags.split(',');
                    conditionValue.forEach(condition => {
                        if (!tagsList.includes(condition)) isIncludeAll = false;
                    });
                    if (isIncludeAll) result.push(fileInfo);
                });
                queryResult.content = result;
                queryResult.total = result.length;
            }
            if (filterType === 'createTime' || filterType === 'updateTime') {
                const [startTimeString, endTimeString] = conditionValue;
                const startTime = dayjs(startTimeString);
                const endTime = dayjs(endTimeString);
                content.forEach(fileInfo => {
                   const { [filterType]: time } = fileInfo;
                   if (time && startTime.isBefore(time) && endTime.isAfter(time)) {
                       result.push(fileInfo);
                   }
                });
                queryResult.content = result;
                queryResult.total = result.length;
            }
        }
        responseContainer.status = 200;
        responseContainer.data = queryResult;
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default getUploadFilesByUser;
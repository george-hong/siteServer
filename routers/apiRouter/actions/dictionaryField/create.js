import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, requestTokenInfoContainerField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject, throwErrorMessageOnResponse } from '../../../utilities/serverUtilities';
import utilMethod from '../../../utilities/methods';
import { getCurrentTime } from '../../../utilities/time';

const create = async (request, response, next) => {
    const { [requestParamsField]: requestParams, [requestTokenInfoContainerField]: tokenExtraInfo } = request;
    const { [responseContainerField]: responseContainer } = response;
    const { id: userIdFromToken } = tokenExtraInfo;
    const fields = ['dicId', 'fieldName', 'fieldCode', 'fieldExtraCode', 'remark'];
    try {
        const dataToInsert = extractFieldsAsAObject(requestParams, fields);
        const { dicId, fieldName, fieldCode } = dataToInsert;
        if (utilMethod.isEmptyField(dicId)) throwErrorMessageOnResponse(response, '没有关联字典信息');
        if (utilMethod.isEmptyField(fieldName)) throwErrorMessageOnResponse(response, '请填写字段名称');
        if (utilMethod.isEmptyField(fieldCode)) throwErrorMessageOnResponse(response, '没填写字段编码');
        dataToInsert.userId = userIdFromToken;
        dataToInsert.createTime = dataToInsert.updateTime = getCurrentTime();
        const nameRepeatField = await mySQL.queryItem(tableNames.dictionaryField, { fields: { fieldName: dataToInsert.fieldName, status: 'on', dicId } }, 'id');
        const codeRepeatField = await mySQL.queryItem(tableNames.dictionaryField, { fields: { fieldCode: dataToInsert.fieldCode, status: 'on', dicId } }, 'id');
        if (nameRepeatField && nameRepeatField.length) throwErrorMessageOnResponse(response, '字段名称重复');
        if (codeRepeatField && codeRepeatField.length) throwErrorMessageOnResponse(response, '字段编码重复');
        const insertResult = await mySQL.insertThenBackId(tableNames.dictionaryField, dataToInsert);
        responseContainer.status = 200;
        responseContainer.data = insertResult;
    } catch (err) {
        responseContainer.data = err;
    }
    next();
};

export default create;
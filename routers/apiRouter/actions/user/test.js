import mySQL from '../../../../mySQL/index';
import { tableNames, requestParamsField, responseContainerField } from '../../../../mySQL/config';
import { extractFieldsAsAObject } from '../../../utilities/serverUtilities';

const test = async(request, response, next) => {
  const { [requestParamsField]: requestParams } = request;
  const { [responseContainerField]: responseContainer } = response;
  
  responseContainer.status = 200;
  responseContainer.data = 'test';
  next();
};

export default test;
import mySQL from '../../../../mySQL/index';
import { tableNames } from '../../../../mySQL/config';
import { requestParamsField, responseContainerField } from '../../fieldConfig';
import { extractFieldsAsAObject } from '../../../utilities/serverUtilities';

const test = async(request, response, next) => {
  const { [requestParamsField]: requestParams } = request;
  const { [responseContainerField]: responseContainer } = response;
  
  responseContainer.status = 200;
  responseContainer.data = 'test';
  next();
};

export default test;
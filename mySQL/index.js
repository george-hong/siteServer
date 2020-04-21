import DataBase from './dataBase';
import keywordConfig from './keywordConfig';

const dbMethods = {
  insert(tableName, dataToInsert) {
    return new Promise(async (resolve, reject) => {
      try {
        const dataBase = new DataBase();
        dataBase.createPool();
        const insertResult = await dataBase.insert(tableName, dataToInsert);
        dataBase.destroyPool();
        resolve(insertResult);
      } catch (err) {
        reject(err);
      }
    });
  },
  // 插入数据并返回id
  insertThenBackId(tableName, dataToInsert) {
    return new Promise(async (resolve, reject) => {
      try {
        const dataBase = new DataBase();
        dataBase.createPool();
        const insertResult = await dataBase.insert(tableName, dataToInsert);
        dataBase.destroyPool();
        resolve({ id: insertResult.insertId });
      } catch (err) {
        reject(err);
      }
    });
  },
  queryItem(tableName, searchKey, searchValue) {
    return new Promise(async (resolve, reject) => {
      try {
        const dataBase = new DataBase();
        dataBase.createPool();
        const queryResult = await dataBase.queryItem(tableName, searchKey, searchValue);
        dataBase.destroyPool();
        resolve(queryResult);
      } catch (err) {
        reject(err);
      }
    });
  },
  queryList(tableName, searchCondition, showCondition) {
    return new Promise(async (resolve, reject) => {
      try {
        const dataBase = new DataBase();
        dataBase.createPool();
        const { page = 1, pageSize = 10 } = searchCondition;
        const queryResult = await dataBase.queryList(tableName, searchCondition, showCondition);
        const totalField = 'total';
        const total = await dataBase.query(tableName, searchCondition, `${keywordConfig.countKeyword}(*) ${keywordConfig.asKeyword} ${totalField}`);
        dataBase.destroyPool();
        resolve({
          data: queryResult,
          total: total[0][totalField],
          page: Number(page),
          pageSize: Number(pageSize),
        });
      } catch (err) {
        reject(err);
      }
    });
  },

}

module.exports = dbMethods;
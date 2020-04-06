const DataBase = require('./dataBase');

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
  }
}

module.exports = dbMethods;
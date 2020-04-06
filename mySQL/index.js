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
  async query() {

  }
}

module.exports = dbMethods;
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
                resolve({id: insertResult.insertId});
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
                const {page = 1, pageSize = 10} = searchCondition;
                const queryResult = await dataBase.queryList(tableName, searchCondition, showCondition);
                const totalField = 'total';
                const total = await dataBase.query(tableName, searchCondition, `${keywordConfig.countKeyword}(*) ${keywordConfig.asKeyword} ${totalField}`);
                dataBase.destroyPool();
                resolve({
                    content: queryResult,
                    total: total[0][totalField],
                    page: Number(page),
                    pageSize: Number(pageSize),
                });
            } catch (err) {
                reject(err);
            }
        });
    },
    querySearch(tableName, searchCondition, searchValue) {
        return new Promise(async (resolve, reject) => {
            try {
                const dataBase = new DataBase();
                dataBase.createPool();
                const queryResult = await dataBase.querySearch(tableName, searchCondition, searchValue);
                console.log('查询结果', queryResult)
                dataBase.destroyPool();
                resolve({
                    content: queryResult
                });
            } catch (err) {
                reject(err);
            }
        });
    },
    updateItem(tableName, searchCondition, dataToUpdate) {
        return new Promise(async (resolve, reject) => {
            try {
                const dataBase = new DataBase();
                dataBase.createPool();
                const updateResult = await dataBase.updateItem(tableName, searchCondition, dataToUpdate);
                dataBase.destroyPool();
                resolve(updateResult);
            } catch (err) {
                reject(err);
            }
        });
    },
    updateGroup(tableName, searchCondition, dataToUpdate) {
        return new Promise(async (resolve, reject) => {
            try {
                const dataBase = new DataBase();
                dataBase.createPool();
                const updateResult = await dataBase.updateGroup(tableName, searchCondition, dataToUpdate);
                dataBase.destroyPool();
                resolve(updateResult);
            } catch (err) {
                reject(err);
            }
        });
    },
    removeGroup(tableName, searchCondition) {
        return new Promise(async (resolve, reject) => {
            try {
                const dataBase = new DataBase();
                dataBase.createPool();
                const updateResult = await dataBase.removeGroup(tableName, searchCondition);
                dataBase.destroyPool();
                resolve(updateResult);
            } catch (err) {
                reject(err);
            }
        });
    },
}

module.exports = dbMethods;
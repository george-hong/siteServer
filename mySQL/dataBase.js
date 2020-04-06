const mysql = require('mysql');
const { sqlLoginInfo } = require('./config');
// 创建空原型
const dataBasePrototype = Object.create({});
// 原型方法
const baseMethods = {
  // 创建一个连接池
  createPool() {
    this.pool = mysql.createPool(sqlLoginInfo);
    return this;
  },
  insert(tableName, dataToInsert = {}) {
    return new Promise((resolve, reject) => {
      if (!this.pool) {
        this.createPool();
      }
      const keys = Object.keys(dataToInsert);
      const values = Object.values(dataToInsert);
      const insertConfig = {
        sql: `${this.insertKeyword} ${tableName}(${keys.join(',')}) ${this.valuesKeyword}(${keys.map(() => '?').join(',')})`,
        values,
      };
      this.pool.query(insertConfig, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  queryItem(tableName, key, value) {
    return new Promise((resolve, reject) => {
      if (!this.pool) {
        this.createPool();
      }
      const insertConfig = {
        // TODO 这里应给查询条件提供一个配置项
        sql: `${this.selectKeyword} id ${this.fromKeyword} ${tableName} ${this.whereKeyword} ${key} = '${value}' ${this.limitKeyword} 1`,
        timeout: 90000,
      };
      this.pool.query(insertConfig.sql, (err, results, fields) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },
  destroyPool() {
    if (this.pool) this.pool.end();
  }
};
const keywordConfig = {
  insertKeyword: 'INSERT',
  selectKeyword: 'SELECT',
  deleteKeyword: 'DELETE',
  updateKeyword: 'UPDATE',
  setKeyword: 'SET',
  whereKeyword: 'WHERE',
  valuesKeyword: 'VALUES',
  fromKeyword: 'FROM',
  limitKeyword: 'LIMIT'
};
Object.assign(dataBasePrototype, baseMethods);

const DataBase = function() {
  // 配置关键字
  Object.assign(this, keywordConfig);
  // 当前存储的连接池信息
  this.pool = null;
};
// 设置原型
// Object.setPrototypeOf(DataBase, dataBasePrototype);
DataBase.prototype = dataBasePrototype;

module.exports = DataBase;


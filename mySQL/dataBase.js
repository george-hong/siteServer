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
      console.log('insertConfig');
      console.log(insertConfig);
      this.pool.query(insertConfig, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
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
  valuesKeyword: 'VALUES'
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


import mysql from 'mysql';
import {sqlLoginInfo} from './config';
import keywordConfig from './keywordConfig';
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
            console.log('------------------ insert ----------------');
            console.log(insertConfig);

            this.pool.query(insertConfig, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    query(tableName, searchCondition, showCondition = 'id') {
        // tableName 查询的表名称
        // searchCondition = { fields: { key, value }, orderBy} 需要查询的条件
        // showCondition 查询成功后需要展示的内容
        return new Promise((resolve, reject) => {
            if (!this.pool) {
                this.createPool();
            }
            //    查询字段 排序字段 限制数量 排序顺序asc/desc
            const {fields, order, limit, orderDirection} = searchCondition;
            console.log('searchCondition');
            console.log(searchCondition);

            let searchSentence = '';
            if (fields) {
                const conditions = Object.entries(fields).map(group => {
                    const [key, value] = group;
                    return `${key} = '${value}'`;
                }).join(` ${this.andKeyword} `);
                searchSentence = ` ${this.whereKeyword} ${conditions}`
            }
            let orderSentence = '';
            if (order) orderSentence = ` ${this.orderByKeyword} ${order}${orderDirection ? ` ${orderDirection}` : ''}`;
            let limitSentence = '';
            if (limit) limitSentence = ` ${this.limitKeyword} ${limit}`;


            const queryConfig = {
                // TODO 这里应给查询条件提供一个配置项
                sql: `${this.selectKeyword} ${showCondition} ${this.fromKeyword} ${tableName}${searchSentence}${orderSentence}${limitSentence}`,
            };
            console.log('------------------ SQL语句 ------------------')
            console.log(queryConfig.sql);

            this.pool.query(queryConfig.sql, (err, results, fields) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },
    queryItem(tableName, searchCondition, showCondition = 'id') {
        return this.query(tableName, searchCondition, showCondition);
    },
    // sql分页查询
    queryList(tableName, searchCondition, showCondition = 'id') {
        // 解析page和pageSize字段组合成limit
        const conditionsCopy = JSON.parse(JSON.stringify(searchCondition));
        const {
            page = 1,
            pageSize = 10,
            orderDirection,
            order,
        } = conditionsCopy;
        conditionsCopy.limit = `${(page - 1) * pageSize}, ${pageSize}`;           // 默认第一页的页码为1
        conditionsCopy.order = order ? order : 'id'; // 默认id倒序查询
        conditionsCopy.orderDirection = orderDirection ? orderDirection : 'desc'; // 默认id倒序查询

        return this.query(tableName, conditionsCopy, showCondition);
    },
    // sql模糊查询
    querySearch(tableName, searchCondition, showCondition = 'id') {
        return new Promise((resolve, reject) => {
            if (!this.pool) {
                this.createPool();
            }
            //    查询字段 排序字段 限制数量 排序顺序asc/desc
            const {search, order, limit, orderDirection} = searchCondition;
            const searchSentence = ` ${this.whereKeyword} ${search}`;
            let orderSentence = '';
            if (order) orderSentence = ` ${this.orderByKeyword} ${order}${orderDirection ? ` ${orderDirection}` : ''}`;
            let limitSentence = '';
            if (limit) limitSentence = ` ${this.limitKeyword} ${limit}`;


            const queryConfig = {
                // TODO 这里应给查询条件提供一个配置项
                sql: `${this.selectKeyword} ${showCondition} ${this.fromKeyword} ${tableName}${searchSentence}${orderSentence}${limitSentence}`,
            };
            console.log('------------------ SQL查询语句 ------------------')
            console.log(queryConfig.sql);

            this.pool.query(queryConfig.sql, (err, results, fields) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },
    destroyPool() {
        if (this.pool) this.pool.end();
    }
};

Object.assign(dataBasePrototype, baseMethods);

const DataBase = function () {
    // 配置关键字
    Object.assign(this, keywordConfig);
    // 当前存储的连接池信息
    this.pool = null;
};
// 设置原型
// Object.setPrototypeOf(DataBase, dataBasePrototype);
DataBase.prototype = dataBasePrototype;

module.exports = DataBase;


import mysql from 'mysql';
import { sqlLoginInfo } from './config';
import keywordConfig from './keywordConfig';
import { isArray, isObject } from '../libs/utilMethods';

// 判断是否需要添加空格
const cs = string => string ? ` ${ string }` : '';
// 创建空原型
const dataBasePrototype = Object.create({});
// 原型方法
const baseMethods = {
    // 创建连接池
    createPool () {
        this.pool = mysql.createPool(sqlLoginInfo);
        return this;
    },
    // 销毁连接池
    destroyPool () {
        if (this.pool) this.pool.end();
    },
    insert (tableName, dataToInsert = {}) {
        return new Promise((resolve, reject) => {
            if (!this.pool) {
                this.createPool();
            }
            const keys = Object.keys(dataToInsert);
            const values = Object.values(dataToInsert);
            const insertConfig = {
                sql: `${ this.insertKeyword } ${ tableName }(${ keys.join(',') }) ${ this.valuesKeyword }(${ keys.map(() => '?').join(',') })`,
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
    // 查询
    query (tableName, searchCondition, showCondition = 'id') {
        // tableName 查询的表名称
        // searchCondition = { fields: { key, value }, orderBy} 需要查询的条件
        // showCondition 查询成功后需要展示的内容
        return new Promise((resolve, reject) => {
            if (!this.pool) {
                this.createPool();
            }
            //    查询字段 排序字段 限制数量 排序顺序asc/desc
            const { fields, order, limit, orderDirection } = searchCondition;
            let searchSentence = '';
            // if (fields) {
            //     const conditions = Object.entries(fields).map(group => {
            //         const [key, value] = group;
            //         return `${ key } = '${ value }'`;
            //     }).join(` ${ this.andKeyword } `);
            //     searchSentence = ` ${ this.whereKeyword } ${ conditions }`
            // }
            if (searchCondition) searchSentence = this.getWhereSentence(searchCondition);
            let orderSentence = '';
            if (order) orderSentence = ` ${ this.orderByKeyword } ${ order }${ orderDirection ? ` ${ orderDirection }` : '' }`;
            let limitSentence = '';
            if (limit) limitSentence = ` ${ this.limitKeyword } ${ limit }`;

            console.log('searchSentence------',searchSentence)
            const queryConfig = {
                // TODO 这里应给查询条件提供一个配置项
                sql: `${ this.selectKeyword } ${ showCondition } ${ this.fromKeyword } ${ tableName }${ cs(searchSentence) }${ orderSentence }${ limitSentence }`,
            };
            console.log('------------------ SQL语句 ------------------')
            console.log(queryConfig.sql);

            this.pool.query(queryConfig.sql, (err, results, fields) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },
    queryItem (tableName, searchCondition, showCondition = 'id') {
        return this.query(tableName, searchCondition, showCondition);
    },
    // sql分页查询
    queryList (tableName, searchCondition, showCondition = 'id') {
        // 解析page和pageSize字段组合成limit
        const conditionsCopy = JSON.parse(JSON.stringify(searchCondition));
        const {
            page = 1,
            pageSize = 10,
            orderDirection,
            order,
        } = conditionsCopy;
        conditionsCopy.limit = `${ (page - 1) * pageSize }, ${ pageSize }`;           // 默认第一页的页码为1
        conditionsCopy.order = order ? order : 'id'; // 默认id倒序查询
        conditionsCopy.orderDirection = orderDirection ? orderDirection : 'desc'; // 默认id倒序查询

        return this.query(tableName, conditionsCopy, showCondition);
    },
    // sql模糊查询
    querySearch (tableName, searchCondition, showCondition = 'id') {
        return new Promise((resolve, reject) => {
            if (!this.pool) {
                this.createPool();
            }
            //    查询字段 排序字段 限制数量 排序顺序asc/desc
            const { search, order, limit, orderDirection } = searchCondition;
            const searchSentence = ` ${ this.whereKeyword } ${ search }`;
            let orderSentence = '';
            if (order) orderSentence = ` ${ this.orderByKeyword } ${ order }${ orderDirection ? ` ${ orderDirection }` : '' }`;
            let limitSentence = '';
            if (limit) limitSentence = ` ${ this.limitKeyword } ${ limit }`;


            const queryConfig = {
                // TODO 这里应给查询条件提供一个配置项
                sql: `${ this.selectKeyword } ${ showCondition } ${ this.fromKeyword } ${ tableName }${ searchSentence }${ orderSentence }${ limitSentence }`,
            };
            console.log('------------------ SQL查询语句 ------------------')
            console.log(queryConfig.sql);

            this.pool.query(queryConfig.sql, (err, results, fields) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },
    // 更新项目
    updateItem (tableName, searchCondition, dataToUpdate) {
        return new Promise((resolve, reject) => {
            if (!this.pool) {
                this.createPool();
            }
            //    查询字段
            let searchSentence = '';
            if (searchCondition) searchSentence = this.getWhereSentence(searchCondition);
            let setSentence = '';
            if (dataToUpdate) setSentence = this.getSetSentence(dataToUpdate);
            const queryConfig = {
                // TODO 这里应给查询条件提供一个配置项
                sql: `${ this.updateKeyword } ${ tableName }${ cs(setSentence) }${ cs(searchSentence) }`,
            };
            console.log('------------------ SQL更新语句 ------------------')
            console.log(queryConfig.sql);

            this.pool.query(queryConfig.sql, (err, results, fields) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },
    // 更新项目组
    updateGroup (tableName, searchCondition, dataToUpdate) {
        return new Promise((resolve, reject) => {
            if (!this.pool) {
                this.createPool();
            }
            let searchSentence = '';
            if (searchCondition) searchSentence = this.getWhereSentence(searchCondition);
            let setSentence = '';
            if (dataToUpdate) setSentence = this.getSetSentence(dataToUpdate);


            const queryConfig = {
                // TODO 这里应给查询条件提供一个配置项
                sql: `${ this.updateKeyword } ${ tableName }${ cs(setSentence) }${ cs(searchSentence) }`,
            };
            console.log('------------------ SQL更新组语句 ------------------')
            console.log(queryConfig.sql);

            this.pool.query(queryConfig.sql, (err, results, fields) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },
    // 删除项目组
    removeGroup (tableName, searchCondition) {
        return new Promise((resolve, reject) => {
            if (!this.pool) {
                this.createPool();
            }
            let searchSentence = '';
            if (searchCondition) searchSentence = this.getWhereSentence(searchCondition);


            const queryConfig = {
                // TODO 这里应给查询条件提供一个配置项
                sql: `${ this.deleteKeyword } ${ this.fromKeyword } ${ tableName }${ cs(searchSentence) }`,
            };
            console.log('------------------ SQL删除组语句 ------------------')
            console.log(queryConfig.sql);

            this.pool.query(queryConfig.sql, (err, results, fields) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    /* 以下是sql相关工具方法 */

    // 解析搜索条件
    getWhereSentence (searchCondition) {
        const { fields } = searchCondition;
        let matchCondition = '';
        // 以数组格式解析field
        if (fields && isArray(fields)) {
            matchCondition = fields.map(group => {
                const { key, value, condition = '=' } = group;
                const realValue = typeof value === 'string' ? `'${value}'` : value;
                return `${ key } ${ condition } ${ realValue }`;
            }).join(` ${ this.andKeyword } `);
        }
        if (fields && isObject(fields)) {
            matchCondition = Object.entries(fields).map(group => {
                const [key, value] = group;
                const realValue = typeof value === 'string' ? `'${value}'` : value;
                return `${ key } = ${ realValue }`;
            }).join(` ${ this.andKeyword } `);
        }
        // 返回解析结果
        if (matchCondition) {
            return `${ this.whereKeyword }${ matchCondition ? ` ${ matchCondition }` : '' }`;
        }
        return '';
    },
    // 解析设置数据语句
    getSetSentence (dataToUpdate) {
        let updateSentence = '';
        if (dataToUpdate && isObject(dataToUpdate)) {
            const updateCondition = Object.entries(dataToUpdate).map(group => {
                const [key, value] = group;
                return `${ key } = '${ value }'`;
            }).join(`, `);
            updateSentence = `${ this.setKeyword } ${ updateCondition }`;
        }
        return updateSentence;
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


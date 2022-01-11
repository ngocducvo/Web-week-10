const pgp = require('pg-promise')({
    capSQL: true,
});
const schema = 'public';
const conn = {
  user: 'postgres',
  host: 'localhost',
  database: 'qlbh',
  password: 'depzp',
  port: 5432,
  max: 30,
};
const db = pgp(conn);
exports.load = async tbName => {
    const table = new pgp.helpers.TableName({table: tbName, schema: schema});
    const qStr = pgp.as.format('SELECT * FROM $1',table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log('error db/load:', error);
    }
};

exports.get = async (tbName, fieldName, value) => {
    const table = new pgp.helpers.TableName({table: tbName, schema: schema});
    const qStr = pgp.as.format(`SELECT * FROM $1 WHERE "${fieldName}" ='${value}'`,table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log('error db/get:', error);
    }
};
exports.add = async (tbName, entity) => {
    const table = new pgp.helpers.TableName({table: tbName, schema: schema});
    const qStr = pgp.helpers.insert(entity, null, table) + ' RETURNING *';
    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        console.log('error db/add:', error);
    }
};
exports.exec = async (query) => {
    console.log(query);
    try {
        const res = await db.any(query);
        return res;
    } catch (error) {
        console.log('error db/exec:', error);
    }
};
// exports.delete = async (tbName, entity) => {
//     const table = new pgp.helpers.TableName({table: tbName, schema: schema});
//     const qStr = `DELETE FROM ${tbName} WHERE `
//     try {
//         const res = await db.one(qStr);
//         return res;
//     } catch (error) {
//         console.log('error db/update:', error);
//     }
// };
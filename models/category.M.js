const db = require('./db');
const tbName = 'Categories';
const idFieldName = 'CatID';
const colsName = ['CatName'];

module.exports = {
    all: async () =>{
        const res = await db.load(tbName);
        return res;
    },
    add: async cat =>{
        const res = await db.add(tbName, cat);
        return res;
    },
    get: async id => {
        const res = await db.get(tbName, idFieldName, id);
        return res;
    },
    update: async cat =>{
        const res = await db.exec(`UPDATE "public"."Categories" SET "CatName" = '${cat.CatName}' WHERE "CatID" = ${cat.CatID}`);
        return res;

    },
    delete: async id =>{
        const res = await db.exec(`DELETE FROM "public"."Categories" WHERE "CatID" = ${id}`);
        return res;
    },
}
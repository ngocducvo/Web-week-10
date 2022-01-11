const db = require('./db');
const tbName = 'Products';
const idFieldName = 'ProID';


module.exports = {
    all: async () =>{
        const res = await db.load(tbName);
        return res;
    },
    add: async pro =>{
        const res = await db.add(tbName, pro);
        return res;
    },
    get: async id => {
        const res = await db.get(tbName, idFieldName, id);
        return res;
    },
    update: async pro =>{
        const res = await db.exec(`UPDATE "public"."Products" SET "ProName" = '${pro.ProName}', "TinyDes" = '${pro.TinyDes}', "FullDes" = '${pro.FullDes}', "Price" = '${pro.Price}', "Quantity" = '${pro.Quantity}' WHERE "ProID" = ${pro.ProID}`);
        return res;
    },
    delete: async id =>{
        const res = await db.exec(`DELETE FROM "public"."Products" WHERE "ProID" = ${id}`);
        return res;
    },
    getByCat: async (catID) =>{
        const res = await db.exec(`SELECT * FROM "public"."Products" WHERE "CatID" = ${catID}`);
        return res;
    },
}
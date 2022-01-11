const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const productM = require('../models/product.M');
const categoryM = require('../models/category.M');


router.get('/', async (req, res) =>{
    let products = await productM.all();
    return res.render('product/productList',{
        header: () => 'signined/header',
        products
    });
});

router.get('/add-product', async (req, res) =>{
    let categories = await categoryM.all();
    return res.render('product/addProduct',{
        header: () => 'signined/header',
        categories
    });
});

router.post('/add',upload.single('uploaded_file'), async (req, res) => {
    console.log(req.file);
    product = {
        ProName: req.body.ProName,
        TinyDes: req.body.TinyDes,
        FullDes: req.body.FullDes,
        CatID: req.body.CatID,
        Price: req.body.Price,
        Quantity: req.body.Quantity,
        ImgPath: req.file.filename
    }
    try {
        const rs = await productM.add(product);
        return res.render('product/addProduct',{
            header: () => 'signined/header',
            msg: "Add successed",
            color: "success"
        });
    } catch (error) {
        return res.render('product/addProduct',{
            header: () => 'signined/header',
            msg: "Add failed",
            color: "danger"
        });
    }
})
router.get('/delete/:id', async (req, res) =>{
    const id = parseInt(req.params.id);
    try {
        const rs = await productM.delete(id);
        res.redirect('/product');
    } catch (error) {
        console.log(error);
    }
});
router.get('/edit/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const rs = await productM.get(id);
        res.render('product/editProduct',{
            header: () => 'signined/header',
            product: rs[0],
        });
    } catch (error) {
        console.log(error);
    }
})
router.post('/edit/:id', async (req, res) =>{
    const id = parseInt(req.params.id);

    product = {
        ProID: id,
        ProName: req.body.ProName,
        TinyDes: req.body.TinyDes,
        FullDes: req.body.FullDes,
        Price: req.body.Price,
        Quantity: req.body.Quantity
    }

    try {
        const rs = await productM.update(product);
        const product_new = await productM.get(product.ProID);
        res.render('product/editProduct',{
            header: () => 'signined/header',
            product: product_new[0],
            color: 'success',
            msg: 'Product has updated'
        });
    } catch (error) {
        res.render('product/editProduct',{
            header: () => 'signined/header',
            product,
            color: 'danger',
            msg: error,
        });
        return;
    }
});
module.exports = router;
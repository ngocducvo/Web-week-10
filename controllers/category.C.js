const express = require('express');
const router = express.Router();
const categoryM = require('../models/category.M');
const productM = require('../models/product.M');

router.get('/', async (req, res) => {
    let categories = await categoryM.all();
    res.render('category/category',{
        header: () => 'signined/header',
        categories: categories,
    });
});
router.post('/', async (req, res) =>{
    const catName = req.body.CatName;
    category = {
        CatName: catName,
    };
    const rs = await categoryM.add(category);
    res.redirect('/category');

});
router.get('/editcat/:id', async (req, res) => {
    const id = req.params.id;
    let categories = await categoryM.get(id);
    res.render('category/edit-category',{
        header: () => 'signined/header',
        id: categories[0].CatID,
        name: categories[0].CatName,
    });
});
router.post('/editcat/:id', async (req, res) =>{
    const id = parseInt(req.params.id);
    const catName = req.body.CatName;
    category = {
        CatID: id,
        CatName: catName,
    };
    console.log(category);
    try {
        const rs = await categoryM.update(category);
        const categories = await categoryM.get(category.CatID);
        res.render('category/edit-category',{
            header: () => 'signined/header',
            id: categories[0].CatID,
            name: categories[0].CatName,
            color: 'success',
            msg: 'Category name has updated'
        });
    } catch (error) {
        res.render('category/edit-category',{
            header: () => 'signined/header',
            id: category.CatID,
            name: category.CatName,
            color: 'danger',
            msg: error,
        });
        return;
    }
});
router.get('/delete/:id', async (req, res) =>{
    const id = parseInt(req.params.id);
    try {
        const rs = await categoryM.delete(id);
        res.redirect('/category');
    } catch (error) {
        console.log(error);
    }
});
router.get('/product/:id', async (req, res) =>{
    const id = parseInt(req.params.id);
    const cat = await categoryM.get(id);
    const products = await productM.getByCat(id);
    res.render('category/show-product',{
        header: () => 'signined/header',
        products: products,
        CatName: cat[0].CatName,
    })
});

module.exports = router;
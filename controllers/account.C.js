const express = require('express');
const router = express.Router();
const userM = require('../models/user.M');
const bcrypt = require('bcrypt');
const passport = require('passport');
const saltRounds = 10;

router.get('/signin', async (req, res) => {
    if(req.user){
        res.redirect('/category');
        return;
    }
    res.render('account/signin',{
        header: () => 'header',
    });
});

router.get('/register', (req, res) => {
    if(req.user){
        res.redirect('/category');
        return;
    }
    res.render('account/register',{
        header: () => 'header',
        
    });
});

router.post('/register', async (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    let user =await userM.get(username);
    if (user) {
        res.redirect('./signin');
        console.log(user);
        return;
    }
    try {
        const pwdHashed = await bcrypt.hash(password,saltRounds);
        user = {
            f_Username: username,
            f_Password: pwdHashed,
            f_Name: username,
            f_Email: null,
            f_DOB: null,
            f_Permission: null,
        };
        const rs = await userM.add(user);
        res.redirect('./signin');
    } catch (error) {
        console.log(error);
    }
})
router.post('/signin', async (req, res, next) =>{
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.render('account/signin',{
                header: () => 'header',
                color: 'danger',
                msg: err,
            });
        }
        if (!user) {
            return res.render('account/signin',{
                header: () => 'header',
                color: 'danger',
                msg: 'Incorrect username',
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.render('account/signin',{
                    header: () => 'header',
                    color: 'danger',
                    msg: err,
                });
            }
            return res.redirect('/category');
        })
    })(req, res, next);
})
router.get('/signout', (req,res) =>{
    if(req.user){
        req.logOut();
    }
    res.redirect('/');
})
module.exports = router;
const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const session = require('express-session');

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'abcdasdw',
    resave: false,
    saveUninitialized: true,
}));

const isSignin = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }
    else {
        res.redirect('/account/signin');
    }
}

require('./middlewares/passport')(app);

app.use('/account',require('./controllers/account.C'));
app.use('/category', isSignin, require('./controllers/category.C'));
app.use('/product', isSignin, require('./controllers/product.C'));

app.get('/', (req, res) => {
    if(req.user){
        res.redirect('/category');
        return;
    }
    res.render('home', {
        header: () => 'header',
    });
});

app.use(express.static(__dirname + '/public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
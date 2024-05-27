const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport =  require('passport');
const LocalStrategy =  require('passport-local');
const User = require('./models/user');
const cartRoutes = require('./routes/cart');
const dotenv = require('dotenv');
const mongoStore = require('connect-mongo');
const paymentRoutes = require('./routes/payment');

dotenv.config()


mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



const sessionConfig = {
    secret: 'weneedsomebettersecret',
    resave: false,
    store : mongoStore.create({
        mongoUrl : process.env.MONGO_URL ,
        touchAfter : 24 * 3600 ,
        autoRemove : 'native'
    }),
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expires:Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



passport.use(new LocalStrategy(User.authenticate()));


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})



// Routes require
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const MongoStore = require('connect-mongo');
const Product = require('./models/product');


// middle express
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(paymentRoutes);


const port = 5000 || process.env.PORT;

app.get('/' , async (req , res) => {
    let products = await Product.find({});
    res.render('home' , {products});
})

app.listen(port, () => {
    console.log(`server running at port ${port} version 5`);
});
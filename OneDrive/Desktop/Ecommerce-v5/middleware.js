const Product = require("./models/product");
const { productSchema } = require("./schema");
const { reviewSchema } = require("./schema");
const passport = require('passport');


const isLoggedIn = (req , res , next) => {
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    else{
        next();
    }
    console.log(req.user)
}


const validateProduct = (req,res,next)=>{
    const {name, img, price , desc} = req.body;
    const {error} = productSchema.validate({name,img,price,desc});
    
    if(error){
        const msg = error.details.map((err)=>err.message).join(',');
        return res.render('error' , {err:msg});
    }
    next();
}

const validateReview = (req,res,next)=>{

    const {rating, comment} = req.body;
    const {error} = reviewSchema.validate({rating,comment});

    if(error){
        const msg = error.details.map((err)=>err.message).join(',');
        return res.render('error' , {err:msg});
    }
    next();
}

const isSeller = (req , res , next) => {
    if(!req.user.role){
        req.flash("error" , "You do Not Have the permission to access this page");
        return res.redirect('/products');
    }
    if(req.user.role !== 'seller'){
        req.flash("error" , "You do not have the permission to access this page");
        return res.redirect('/products');
    }
    next();
}

const isAuthor = async (req , res , next) => {
    const {id} = req.params;
    let product = await Product.findById(id);
    if(!req.user._id.equals(product.author)){
        req.flash("error" , "You do not have the permission to access this page");
        return res.redirect('/products');
    }
    next();
}

module.exports = {validateProduct ,validateReview , isLoggedIn , isSeller , isAuthor} ;
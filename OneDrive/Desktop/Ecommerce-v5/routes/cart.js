const express = require('express');
const Product = require('../models/product');
const User = require('../models/user');
const { isLoggedIn } = require('../middleware');
const router = express.Router();



router.post('/products/:id/add' , async (req , res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    const user = await User.findById(req.user._id);
    user.cart.push(product);
    await user.save();
    res.redirect('/cart');
})

router.delete('/cart/:id' , async (req , res) => {
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(req.user._id , {
        $pull : {cart : id}
    } , {new : true});
    res.redirect('/cart');
})

router.get('/cart' , isLoggedIn , async(req , res) => {
    let id = req.user._id;
    let user = await User.findById(id).populate('cart');
    let userCart = user.cart;
    res.render('cart/cart' , { userCart });
})
module.exports = router;
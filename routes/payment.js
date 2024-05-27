const express = require('express');
const User = require('../models/user');
const { isLoggedIn } = require('../middleware');
const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');
const router = express.Router();

router.get('/create-checkout-session', isLoggedIn ,  async (req, res) => {
    const user = await User.findById(req.user._id).populate('cart');
    const cart = user.cart;
    const session = await stripe.checkout.sessions.create({
        billing_address_collection : 'required',
        shipping_address_collection : {
            allowed_countries : [
                'IN'
            ]
        } ,
        payment_method_types: ['card'],
        line_items: cart.map( (item) => {
            return {
                price_data : {
                    currency : 'inr' ,
                    product_data : {
                        name : item.name
                    } ,
                    unit_amount: item.price * 100 
                } ,
                quantity : 1
            }
        }),
      mode: 'payment',
      success_url: `http://localhost:5000/success`,
      cancel_url: `http://localhost:5000/cancel`,
    });
  
    res.redirect(303, session.url);
  });
  
router.get('/success' , (req , res) => {
    res.render('payement/success');
})

router.get('/cancel' , (req , res) => {
    res.render('payement/error');
})

module.exports = router;


const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const { isloggedin } = require('../middlewares/isloggedin');
const productModel = require('../models/product-model');
const collectionModel = require('../models/collections-model');

router.get('/', async (req, res)=>{ 
    let user = await userModel.find();
    let error = req.flash("error")
    res.render("index", {error, loggedin: false, user});
});

router.get('/shop', isloggedin, async (req, res)=>{
    let products = await productModel.find();
    let success = req.flash("success");
    const user = req.user;
    res.render("shop",{products , success, user});
});
router.get('/collection', isloggedin , async (req, res)=>{
    let collections  = await collectionModel.find();
    let user = await userModel.find();
    res.render("NewCollections", {collections, user});
})

router.get('/cart', isloggedin, async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email}).populate("cart");
    let products = await productModel.find();
    res.render("cart", {user, products});
});

router.get('/profile', isloggedin, async (req, res) => {
    const user = req.user;
    res.render('profile', {user});
});

router.get('/addtocart/:productId', isloggedin, async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email})
    user.cart.push(req.params.productId);
    await user.save();
    req.flash("success", "Added to cart!");
    res.redirect("/shop");
});
router.post('/removefromcart/:productId', isloggedin, async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email});
    user.cart.pull(req.params.productId);
    await user.save();
    req.flash("success", "Product removed from cart!");
    res.redirect("/cart");
});


module.exports = router;
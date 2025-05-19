const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');


module.exports.userRegister = async (req, res)=>{
    try{
        let{fullname, email, password} = req.body; 
     
    let user = await userModel.findOne({email});
    if(user) return res.status(401).send("You already have an account, please Login");
    
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            let createdUser = await userModel.create({
                fullname,
                email,
                password: hash
            });
            let token = generateToken(createdUser);
            res.cookie("token", token);
            res.redirect("/");
        });
    });
    }
    catch(err){
        console.log(err.message)
    }
}

module.exports.login = async (req, res)=>{
    let {email , password} = req.body;

    let user = await userModel.findOne({email});
    if(!user) {
        req.flash("error", "email or password incorrect")  
        return res.redirect("/");
    }
    
    bcrypt.compare(password, user.password , function(err, result) {
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");
        } else{
            req.flash("error", "email or password incorrect")  
            return res.redirect("/");
        }
    });
}

module.exports.logout = async (req, res)=>{
    res.cookie("token", "");
    res.redirect("/");
}
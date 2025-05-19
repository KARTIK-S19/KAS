const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");

module.exports.isloggedin = async (req, res , next)=>{

    if(!req.cookies.token){
        req.flash("error", "You mush be logged in");
        return res.redirect("/");
    } 

    try{
        let decode = jwt.verify(req.cookies.token , process.env.JWT_KEY);
        let user = await userModel
        .findOne({email: decode.email})
        .select("-password");
        req.user = user;
        next();
    } 
    catch(error){
        req.flash("error", "Something went wrong");
        res.redirect("/");
    }
}
const express = require('express');
const router = express.Router()
const upload = require("../config/multer-config")
const collectionModel = require('../models/collections-model');
const { isloggedin } = require('../middlewares/isloggedin');


router.post('/createCollection', upload.single("image") , async (req, res)=>{

try{
    let { title , description } = req.body;

    
    let collection = await collectionModel.create({
    image: req.file.buffer,
    title,
    description
    });
    req.flash("error", "Succecfully created collection");
    res.redirect("/owners/admin");
    console.log(collection);
    } 
    catch(err){
        res.send(err.message);
    }
});


module.exports = router;
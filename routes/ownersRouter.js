const express = require('express');
const router = express.Router()
const ownerModel = require('../models/owners-model');


if(process.env.NODE_ENV === "development"){
    router.post('/create', async (req, res)=>{
        let owners = await ownerModel.find();
        if(owners.length > 0){
            return res
            .status(504)
            .send("You cannot create a new Owner");
        }

        let {fullname, email, password} = req.body;

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        })
        res.send(createdOwner)
    });
}

router.get("/admin", (req, res)=>{
    const user = req.user || null;
    let success = req.flash("success");
    res.render("createproducts", {success , user});
})


module.exports = router;
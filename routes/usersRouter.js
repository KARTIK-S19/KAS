const express = require('express');
const router = express.Router()
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');
const { isloggedin } = require('../middlewares/isloggedin');
const { userRegister , login , logout } = require('../controllers/authController');

router.get('/', (req, res)=>{
    res.send("Heyy user!!");
});

router.post("/register", userRegister );

router.post("/login", login );

router.get("/logout", logout);


module.exports = router;
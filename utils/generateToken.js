const jwt = require('jsonwebtoken');

const generateToken = (createdUser)=>{
    return jwt.sign({email: createdUser.email, id: createdUser._id}, process.env.JWT_KEY);
}

module.exports = { generateToken };
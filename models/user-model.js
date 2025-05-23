const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: String,
    password:  {
        type: String,
        required: true
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId ,
        ref: "product"
    }],
    isAdmin: Boolean,
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String
});

module.exports = mongoose.model("user", userSchema);
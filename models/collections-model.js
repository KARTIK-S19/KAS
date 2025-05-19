const mongoose = require('mongoose');

const collectionSchema = mongoose.Schema({
    image: {
        type: Buffer,
        required: true
    },
    title: String,
    description: String
})

module.exports = mongoose.model("collection", collectionSchema);
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    expireTime: String,
    description: String,
    price: Number,
    imagePath: String,
    created: String
})

const itemModel = mongoose.model('items', itemSchema);
module.exports = itemModel;
const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema({
    songName: String,
    authorName: String,
    dateSubmit: String,
    authorCreate: String,
    path: String,
    sugesstion: String,
    photoURL: String,
    category: String,
    album: String,
    submmitted: Number,
    liked: Number,
    listened: Number
})

const audioModel = mongoose.model('audio', audioSchema);
module.exports = audioModel;
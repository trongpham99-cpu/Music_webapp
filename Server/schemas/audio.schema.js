const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema({
    songName: String,
    authorId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "artist"
        },
    dateSubmit: String,
    authorCreate: String,
    path: String,
    sugesstion: String,
    photoURL: String,
    category: String,
    album: String,
    submmitted: Number,
    liked: Number,
    listened: Number,
    status: String
})

const audioModel = mongoose.model('audio', audioSchema);
module.exports = audioModel;

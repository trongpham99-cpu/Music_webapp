const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
    artistName: String,
    dateOfBirth: String,
    placeOfBirth: String,
    describtion: String,
    followers: Number,
    listeners: Number,
    worldArtistRanked: Number,
    songs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "audio"
        }
    ]
})

const artistModel = mongoose.model('artist', artistSchema);
module.exports = artistModel;
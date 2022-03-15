const mongoose = require("mongoose");


const typeAudioSchema = mongoose.Schema({
    name_type: String,
    album: String,
    description: String,
    dateAdd: String,
    photo: String,
    audios: [],

})

const typeAudioModel = mongoose.model('typeAudio', typeAudioSchema);
module.exports = typeAudioModel;
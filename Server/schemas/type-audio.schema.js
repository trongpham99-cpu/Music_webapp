const mongoose = require("mongoose");

const typeAudioSchema = mongoose.Schema({
    name_type: String,
    description: String,
    dateAdd: String,
    photo: String,
    audios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "audio",
    }],

})

const typeAudioModel = mongoose.model('typeAudio', typeAudioSchema);
module.exports = typeAudioModel;
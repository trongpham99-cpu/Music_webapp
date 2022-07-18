const mongoose = require("mongoose");

const typeAudioSchema = mongoose.Schema(
  {
    name_type: String,
    description: String,
    photoURL: String,
    audios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "audios",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const typeAudioModel = mongoose.model("categories", typeAudioSchema);
module.exports = typeAudioModel;

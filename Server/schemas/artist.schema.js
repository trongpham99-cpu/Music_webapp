const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    artistName: String,
    description: String,
    audios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "audios",
        default: Array,
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

const artistModel = mongoose.model("artists", artistSchema);
module.exports = artistModel;

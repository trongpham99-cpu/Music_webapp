const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema(
  {
    audioName: {
      type: String,
      required: true,
    },

    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artists",
    },

    authorCreated: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    path: {
      type: String,
      required: true,
    },

    photoURL: {
      type: String,
      required: true,
    },

    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },

    liked: {
      type: Number,
      default: 0,
    },

    listened: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const audioModel = mongoose.model("audios", audioSchema);

module.exports = audioModel;

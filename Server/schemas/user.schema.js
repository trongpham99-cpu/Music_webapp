const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    default: null,
  },

  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },

  photoURL: {
    type: String,
    default: "https://innostudio.de/fileuploader/images/default-avatar.png",
  },

  role: {
    type: String,
    default: "user",
  },

  library: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "audios",
      default: Array,
    },
  ],
  likeSong: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "audios",
      default: Array,
    },
  ],
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
  } catch (error) {
    console.log(error);
  }
});

userSchema.methods.isCheckPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    next(error);
  }
};

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;

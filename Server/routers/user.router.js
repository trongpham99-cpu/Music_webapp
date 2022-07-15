const userModel = require("../schemas/user.schema");
const app = require("express");
const createError = require("http-errors");
const router = app.Router();

const {
  signAccessToken,
  verifyAccessToken,
} = require("../configs/jwt_service");
const { userValidate } = require("../configs/validation");
const audioModel = require("../schemas/audio.schema.js");

router.post("/register", async (req, res, next) => {
  try {
    const { email, password, displayName, photoURL } = req.body;

    const isExits = await userModel.findOne({
      email: email,
    });

    if (isExits) {
      throw createError.Conflict(`${email} is ready been registered`);
    }

    const user = new userModel({
      email,
      password,
      displayName,
      photoURL,
    });

    await user.save();

    return res.json({
      status: 200,
      elements: null,
      message: " Register Success! ",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createError.BadRequest("Please fill email and password");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw createError.NotFound("User not registered!");
    }

    const isValid = await user.isCheckPassword(password);

    if (!isValid) {
      throw createError.Unauthorized("Wrong Password");
    }
    const accessToken = await signAccessToken(user._id);

    res.json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

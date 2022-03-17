const userModel = require("../schemas/user.schema");
const app = require("express");
const createError = require("http-errors");
const router = app.Router();

const {
  signAccessToken,
  verifyAccessToken,
} = require("../configs/jwt_service");
const { userValidation, loginValidation } = require("../configs/validation");
const audioModel = require("../schemas/audio.schema.js");
const { access } = require("fs");

router.get("/profileWToken", verifyAccessToken, async (req, res) => {
  try {
    const payload = req.payLoad;

    let _user = await userModel.findById(payload.userID);
    res.status(200).send(_user);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/profile/:id", async (req, res) => {
  try {
    let _id = req.params.id;
    let user = await userModel.findById(_id);
    if (user == null) {
      res.status(404).send({ message: "Cannot found!" });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send({ message: error });
    // console.log(error);
  }
});
router.get("/allProfiles", verifyAccessToken, async (req, res, next) => {
  try {
    const payLoad = req.payLoad;

    let user = await userModel.findById(payLoad.userID);

    if (user.Role == "admin") {
      let users = await userModel.find();
      res.status(200).send(users);
    } else {
      res.status(400).send({
        message: "Bạn không thể truy cập vào!",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
router.post("/register", async (req, res) => {
  try {
    let body = req.body;
    let _account = req.body.account;
    let _password = req.body.password;
    let _name = req.body.displayName;
    let _email = req.body.email;
    let err = userValidation(req.body);

    if (err && err.error != undefined) {
      return console.log(err.error);
    }
    // console.log(_email,password);
    if (!_email || !_password || !_account || !_name) {
      throw createError.BadGateway();
    }

    const isExits = await userModel.findOne({
      email: _email,
      account: _account,
    });
    if (isExits) {
      return res.send(`This ${(_email, _account)} already taken!`);
    } else {
      let _user = {
        ...body,
        displayName: _name,
        account: _account,
        password: _password,
        birthday: "",
        phonenumber: "",
        email: _email,
        country: "",
        photo: "",
        Gender: "",
        createDate: Date.now().toString(),
        musicType: "",
        updateDate: Date.now().toString(),
        Role: "user",
        library: [],
        likeSong: [],
        Follow: [],
      };
      let user = new userModel(_user);
      user.save().then((value) => {
        res.status(201).send({
          message: "Successful",
          data: value,
        });
      });
    }

    // const isCreate = await userModel.create({
    //     email: _email,
    //     password: _password
    // })

    // return res.status(201).send(
    //     {message:"Successful",
    //     body: user
    //      })
  } catch (error) {
    res.status(500).send(error);
  }
});
router.put("/addLibrary", verifyAccessToken, async (req, res) => {
  //id bai nhac
  let _audioId = req.body.audioId;
  //id user
  let payLoad = req.payLoad;
  let _userId = payLoad.userID;

  let _user = await userModel.findById(_userId);

  if (_user.library.length === 0) {
    userModel.findByIdAndUpdate(
      _userId,
      { $push: { library: _audioId } },
      (err, result) => {
        if (err) {
          return res.status(400).send(err);
        }
        return res.status(200).send({ message: `add audio` });
      }
    );
    return;
  } else {
    for (let i = 0; i < _user.library.length; i++) {
      if (_user.library[i] === _audioId) {
        const index = _user.library.indexOf(_audioId);
        if (index > -1) {
          _user.library.splice(index, 1);
        }
        userModel.findByIdAndUpdate(_userId, _user, (err, result) => {
          if (err) {
            return res.status(400).send(err);
          }
          return res.status(200).send({ message: `remove audio` });
        });
        return;
      }
    }
    userModel.findByIdAndUpdate(
      _userId,
      { $push: { library: _audioId } },
      (err, result) => {
        if (err) {
          return res.status(400).send(err);
        }
        return res.status(200).send({ message: `add more audio` });
      }
    );
  }
});
router.get("/getLibrary", verifyAccessToken, async (req, res) => {
  try {
    //id bai nhac
    let _audioId = req.body.audioId;
    //id user
    let payLoad = req.payLoad;
    let _userId = payLoad.userID;

    let _user = await userModel.findById(_userId);
    if(!_user) return;

    let library = await audioModel.find({
      '_id': { $in: _user.library}
    }).populate("authorId")
    res.status(200).send(library);

  } catch (error) {
    res.status(500).send(error);
  }
});
router.put("/likeSong", async (req, res) => {
  //id bai nhac
  let audioId = req.body.audioId;
  //id user
  let userId = req.body.userId;
  //push id => library
  userModel
    .findByIdAndUpdate(
      userId,
      {
        $push: { likeSong: audioId },
      },
      (err, success) => {
        return res.status(201).send({
          message: `Add successfully !!!`,
          //   data: success
        });
      }
    )
    .populate("audioId");
  //return
});
router.put("/follow", async (req, res) => {
  try {
    const _artistId = req.body.artistId;
    const _userId = req.body.userId;

    let _user = await userModel.findById(_userId);

    if (_user.Follow.length === 0) {
      userModel.findByIdAndUpdate(
        _userId,
        { $push: { Follow: _artistId } },
        (err, result) => {
          if (err) {
            return res.status(400).send(err);
          }
          return res.status(200).send({ message: `add follow` });
        }
      );
      return;
    } else {
      for (let i = 0; i < _user.Follow.length; i++) {
        if (_user.Follow[i] === _artistId) {
          const index = _user.Follow.indexOf(_artistId);
          if (index > -1) {
            _user.Follow.splice(index, 1);
          }
          userModel.findByIdAndUpdate(_userId, _user, (err, result) => {
            if (err) {
              return res.status(400).send(err);
            }
            return res.status(200).send({ message: `unfollow` });
          });
          return;
        }
      }
      userModel.findByIdAndUpdate(
        _userId,
        { $push: { Follow: _artistId } },
        (err, result) => {
          if (err) {
            return res.status(400).send(err);
          }
          return res.status(200).send({ message: `add more follow` });
        }
      );
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
router.post("/login", async (req, res) => {
  try {
    let _account = req.body.account;
    let _password = req.body.password;
    let err = loginValidation(req.body);

    if (err && err.error != undefined) {
      // console.log(err.error);
      return res.status(400).send({
        message: err.error.details[0].message,
      });
    }
    if (!_password || !_account) {
      return res.status(400).send({
        message: "account or password cannot be empty!",
      });
    }

    const user = await userModel.findOne({ account: _account });

    if (!user) {
      return res.status(404).send({
        message: "User not registered!",
      });
    }

    let isValid = await user.isCheckPassword(_password);

    if (!isValid) {
      return res.status(400).send({
        message: `Password is incorrect!`,
      });
    }

    const accessToken = await signAccessToken(user._id);

    res.status(200).send({
      message: "Login successful!",
      token: accessToken,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

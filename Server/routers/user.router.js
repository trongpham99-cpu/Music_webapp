const userModel = require("../schemas/user.schema");
const app = require("express");
const createError = require("http-errors");
const router = app.Router();

const {
  signAccessToken,
  verifyAccessToken,
} = require("../configs/jwt_service");
const { userValidation } = require("../configs/validation");
const audioModel = require("../schemas/audio.schema.js");

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
    console.log(error);
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

    let _email = req.body.email;
    let _password = req.body.password;

    let err = userValidation(req.body);

    if (err && err.error != undefined) {
      return console.log(err.error);
    }
    // console.log(_email,password);
    if (!_email || !_password) {
      throw createError.BadGateway();
    }

    const isExits = await userModel.findOne({ email: _email });
    if (isExits) {
      return res.send(`${_email} already taken!`);
    } else {
      let _user = {
        ...body,
        displayName: "",
        account: "",
        password: _password,
        birthday: "",
        phonenumber: "",
        email: _email,
        country: "",
        photo: "",
        Gender: "",
        createDate: "",
        musicType: "",
        updateDate: "",
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
    console.log(error);
  }
});
router.put("/addLibrary", async (req, res) => {
  //id bai nhac
  let audioId = req.body.audioId;
  //id user
  let userId = req.body.userId;
  //push id => library
  userModel.findByIdAndUpdate(
    userId,
    {
      $push: { library: audioId },
    },
    (err, success) => {
      return res.status(201).send({
        message: `Add successfully !!!`,
        data: success,
      });
    }
  );
  //return
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
// router.put("/addFollow", async (req, res) => {
//   //id bai nhac
//   let artistId = req.body.artistId;
//   //id user
//   let userId = req.body.userId;
//   //check isExits
//   let user = await userModel.findById(userId);

//   for (let i = 0; i < user.library.length; i++) {
//     if (user.Follow[i] == artistId) {
//       userModel.findByIdAndUpdate(
//         userId,
//         {
//           $pull: { Follow: { $elemMatch: artistId } },
//         },
//         (err, success) => {
//           if (!err) {
//             return res.status(201).send({
//               message: `dislike !!!`,
//               data: success,
//             });
//           }
//         }
//       );
//     }
//   }
//   userModel.findByIdAndUpdate(
//     userId,
//     {
//       $push: { Follow: artistId },
//     },
//     (err, success) => {
//       return res.status(201).send({
//         message: `like !!!`,
//         data: success,
//       });
//     }
//   );
// });

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
    let _email = req.body.email;
    let _password = req.body.password;

    let err = userValidation(req.body);

    if (err && err.error != undefined) {
      return res.status(400).send({
        message: err.error,
      });
    }
    if (!_email || !_password) {
      return res.status(400).send({
        message: "email or password cannot be empty!",
      });
    }

    const user = await userModel.findOne({ email: _email });

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
    console.log(error);
  }
});

module.exports = router;

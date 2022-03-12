const userModel = require("../schemas/user.schema");
const app = require("express");
const createError = require("http-errors");
const router = app.Router();
const { signAccessToken } = require("../configs/jwt_service");
const { userValidation } = require("../configs/validation");
const audioModel = require("../schemas/audio.schema.js");

router.get("/profile", async (req, res) => {
  try {
    let user = await userModel.find();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
});

// router.post("/register", async (req,res)=>{
//     try {
//         let body = req.body;

//         let user = new userModel(body)
//         user.save().then((value)=>{
//             res.status(201).send(
//                 {message:"Successful",
//                 body: user
//             })
//         })
//     } catch (error) {
//         console.log(error);
//     }
// })

router.post("/register", async (req, res) => {
  try {
    let body = req.body;
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
        Role: "",
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

router.post("/login", async (req, res) => {
  try {
    let body = req.body;
    let _email = req.body.email;
    let _password = req.body.password;

    let err = userValidation(req.body);

    if (err && err.error != undefined) {
      return res.status(400).send({
        error: err.error,
      });
    }
    // console.log(_email,password);
    if (!_email || !_password) {
      throw createError.BadGateway();
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
    res.json(accessToken);

    res.status(200).send({
      message: "Login successful!",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
});

//liên kết id
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

router.put("/addFollow", async (req, res) => {
  //id bai nhac
  let artistId = req.body.artistId;
  //id user
  let userId = req.body.userId;
  //check isExits
  let user = await userModel.findById(userId);

  for (let i = 0; i < user.library.length; i++) {
    if (user.Follow[i] == artistId) {
      userModel.findByIdAndUpdate(
        userId,
        {
          $pull: { Follow: { $elemMatch: artistId } },
        },
        (err, success) => {
          if (!err) {
            return res.status(201).send({
              message: `dislike !!!`,
              data: success,
            });
          }
        }
      );
    }
  }

  userModel.findByIdAndUpdate(
    userId,
    {
      $push: { Follow: artistId },
    },
    (err, success) => {
      return res.status(201).send({
        message: `like !!!`,
        data: success,
      });
    }
  );

  //return
});

module.exports = router;

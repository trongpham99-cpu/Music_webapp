const userModel = require("../schemas/user.schema");
const app = require("express");
const createError = require("http-errors");
const router = app.Router();
const {
  signAccessToken,
  verifyAccessToken,
} = require("../configs/jwt_service");
const { userValidation } = require("../configs/validation");

router.get("/profile", async (req, res) => { // 127.0.0.1:3000/user/profile
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

router.get("/getList", verifyAccessToken, async (req, res, next) => {
  try {
    const payLoad = req.payLoad;
    console.log(payLoad);

    let user = await userModel.findById(payLoad.userID);

    console.log(user);

    if (user.Role == "admin") {
      let users = await userModel.find();
      res.status(200).send(users);
    }else{
      res.status(400).send({
        message: "Bạn không thể truy cập vào!"
      })
    }


  } catch (error) {
    res.status(500).send(error);
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
    let _account = req.body.account;
    let _email = req.body.email;
    let _password = req.body.password;
    let err = userValidation(req.body);

    if (err && err.error != undefined) {
      return console.log(err.error);
    }
    // console.log(_email,password);
    if (!_email || !_password || _account) {
      throw createError.BadGateway();
    }
    const isExits = await userModel.findOne({ email: _email });
    if (isExits) {
      return res.send(`${_email} already taken!`);
    } else {
      let _user = {
        ...body,
        displayName: "",
        account: _account,
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
        message: err.error,
      });
    }
    // console.log(_email,password);
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

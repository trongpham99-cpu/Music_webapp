const app = require("express");
const router = app.Router();
const userModel = require("../schemas/user.schema");
const audioModel = require("../schemas/audio.schema.js");
const artistModel = require("../schemas/artist.schema.js");
const { verifyAccessToken } = require("../configs/jwt_service");
const typeAudioModel = require("../schemas/type-audio.schema");
const storage = require("../services/ffmpeg.service");
const createError = require("http-errors");

router.get("/getAll", async (req, res, next) => {
  try {
    let audios = await audioModel
      .find()
      .populate("artistId")
      .populate("authorCreated", "-password -role -library -likeSong")
      .populate("typeId");
    return res.status(200).send(audios);
  } catch (err) {
    next(err);
  }
});

router.get("/getLibrary", verifyAccessToken, async (req, res, next) => {
  try {
    const payLoad = req.payLoad;
    const user = await userModel.findById(payLoad.userID);
  } catch (error) {
    next(error);
  }
});

router.get("/getDetail/:id", async (req, res, next) => {
  try {
    let params = req.params.id;
    let audio = await audioModel
      .findById(params)
      .populate("artistId")
      .populate("authorCreated", "-password -role -library -likeSong")
      .populate("typeId");
    return res.status(200).send(audio);
  } catch (err) {
    next(err);
  }
});

router.get("/getSearch", async (req, res, next) => {
  try {
    let searchfield = req.query.songName;
    let audios = await audioModel
      .find({ songName: { $regex: searchfield, $options: "$i" } })
      .populate("artistId")
      .populate("authorCreated", "-password -role -library -likeSong")
      .populate("typeId");
    return res.status(200).send(audios);
  } catch (err) {
    next(err);
  }
});

router.post("/add-new", verifyAccessToken, storage, async (req, res, next) => {
  try {
    const payLoad = req.payLoad;
    let isAdmin = await userModel.findById(payLoad.userID);

    if (isAdmin.role !== "admin") {
      throw createError.Forbidden("Bạn không có quyền thêm nhạc");
    }

    let data = req.body;

    const files = req.files;

    const id = files[0].originalname.split(".")[0];
    const imageFile = files[1].originalname;

    const path = `http://localhost:3000/public/files/${id}/${id}.m3u8`;

    const photoURL = `http://localhost:3000/public/files/${imageFile}`;

    const _audio = {
      ...data,
      path,
      photoURL,
      authorCreated: isAdmin._id,
    };

    let newAudio = new audioModel(_audio);

    console.log(newAudio);

    await Promise.all([
      artistModel.findByIdAndUpdate(newAudio.artistId, {
        $push: { audios: newAudio._id },
      }),
      typeAudioModel.findByIdAndUpdate(newAudio.typeId, {
        $push: { audios: newAudio._id },
      }),
      newAudio.save(),
    ]);

    res.status(201).send({
      message: `Created Audio`,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/update", verifyAccessToken, async (req, res, next) => {
  try {
    let body = req.body;
    let payLoad = req.payLoad;

    const isAdmin = await userModel.findById(payLoad.userID);
    if (isAdmin.role !== "admin") {
      throw createError.Forbidden("Bạn không có quyền chỉnh sửa");
    }

    const updateAudio = {
      ...body,
      artistId: body.artistId._id,
      typeId: body.typeId._id,
      authorCreated: body.authorCreated._id,
    };
    console.log(updateAudio);
    // await audioModel.findByIdAndUpdate(updateAudio._id, updateAudio);

    return res.status(200).send({
      status: 200,
      message: "Chỉnh sửa thành công!",
    });

    // console.log(data);
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:docId", verifyAccessToken, async (req, res, next) => {
  try {
    const payLoad = req.payLoad;

    let docId = req.params.docId;

    console.log(payLoad, docId);

    const _user = await userModel.findById(payLoad.userID);

    console.log(_user);

    if (_user.role === "admin") {
      let result = await audioModel.findById(docId);
      if (result == null) {
        return res.status(400).send({
          message: `Tìm không được id ${docId} này!!!`,
        });
      } else {
        return res.status(200).send({
          message: "Xoa thanh cong!!!",
        });
      }
    } else {
      return res.status(403).send({
        message: "Bạn không có quyền xóa bài này!",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

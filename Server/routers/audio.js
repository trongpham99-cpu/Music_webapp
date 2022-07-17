const app = require("express");
const router = app.Router();
const userModel = require("../schemas/user.schema");
const audioModel = require("../schemas/audio.schema.js");
const artistModel = require("../schemas/artist.schema.js");
const { verifyAccessToken } = require("../configs/jwt_service");
const typeAudioModel = require("../schemas/type-audio.schema");
const storage = require("../services/ffmpeg.service");

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

router.post("/add-new", storage, async (req, res, next) => {
  try {
    // let payLoad = req.payLoad;

    // let _user = await userModel.findById(payLoad.userID);

    // if (_user.Role != "admin") return;

    let data = req.body;

    const files = req.files;

    const id = files[0].originalname.split(".")[0];

    const path = `http://localhost:3000/public/files/${id}/${id}.m3u8`;

    const photoURL = "http://example.png";

    const _audio = {
      ...data,
      path,
      photoURL,
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

router.put("/updateData", (request, response) => {
  try {
    let body = request.body;
    let data = body.data;
    let docId = body.docId;
    // console.log(data);
  } catch (err) {
    response.status(404).json({ message: err.toString() });
  }
});

router.delete(
  "/deleteAll/:docId",
  verifyAccessToken,
  async (request, response) => {
    try {
      const payLoad = request.payLoad;
      let docId = request.params.docId;

      const _user = await userModel.findById(payLoad.userID);

      if (_user.Role == "admin") {
        let result = await audioModel.findByIdAndDelete(docId);
        if (result == null) {
          return response.status(400).send({
            message: `Tìm không được id ${docId} này!!!`,
          });
        } else {
          return response.status(200).send({
            message: "Xoa thanh cong!!!",
          });
        }
      } else {
        return response.status(403).send({
          message: "Bạn không có quyền xóa bài này!",
        });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

module.exports = router;

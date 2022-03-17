const app = require("express");
const router = app.Router();
const userModel = require("../schemas/user.schema");
const audioModel = require("../schemas/audio.schema.js");
const artistModel = require("../schemas/artist.schema.js");
const { verifyAccessToken } = require("../configs/jwt_service");
const typeAudioModel = require('../schemas/type-audio.schema');
const storage = require('../services/ffmpeg.service');

router.get("/getMusicForUserVip", verifyAccessToken, async(req, res) => {
    try {
        const payLoad = req.payLoad;

        const _user = await userModel.findById(payLoad.userID);

        if (_user.Role == "user-vip" || _user.Role == "admin") {
            let audios = await audioModel.find({ status: "vip" });
            return res.status(200).send(audios);
        } else {
            return res.status(403).send({
                message: `Bạn không có quyền truy cập vào đường dân này!`,
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/getAll", async(request, response) => {
    try {
        let audio = await audioModel.find().populate("authorId");
        response.send(audio);
    } catch (err) {
        response.status(500).send(err)

    }
});

router.get("/getDetail", async(request, response) => {
    try {
        let params = request.query.docId;
        let audio = await audioModel.findById(params).populate("authorId").populate("category");
        response.status(200).send(audio);
    } catch (err) {
        response.status(500).send(err);
    }
});

router.get("/getSearch", async(request, response, next) => {
    try {
        let searchfield = request.query.songName;
        // console.log(searchfield)
        await audioModel
            .find({ songName: { $regex: searchfield, $options: "$i" } })
            .populate("authorId")
            .then((data) => {
                response.status(201).send(data);
            });
    } catch (err) {
        response.status(500).send(err);
    }
});

router.post("/add", verifyAccessToken ,storage ,async (req, res) => {
    try {

        let payLoad = req.payLoad;

        
        let _user = await userModel.findById(payLoad.userID);

        if(_user.Role != "admin") return;

        let data = req.body;
        const id = req.file.originalname.split(".")[0];
        const path = `http://localhost:3000/audios/${id}/${id}.m3u8`
        const newAudio = {
            ...data,
            path: path,
            dateSubmit: Date.now().toString(),
            album: "Implements later",
            submmitted: 0
        }
        let audio = new audioModel(newAudio);
        audio.save(async(err, value) => {
            if (!err) {
                await artistModel.findByIdAndUpdate(
                    audio.authorId, { $push: { songs: audio._id } }
                );
                await typeAudioModel.findByIdAndUpdate(
                    audio.category, { $push: { audios: audio._id } }
                );
                res.status(201).send({
                    message: `Add successful`
                })
            }
        });
    } catch (err) {
        res.status(404).json({ message: err.toString() });
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

router.delete("/deleteAll/:docId", verifyAccessToken ,async (request, response) => {
  try {

    const payLoad = request.payLoad;
    let docId = request.params.docId;

    const _user = await userModel.findById(payLoad.userID);

    if(_user.Role == "admin"){
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
    }else{
      return response.status(403).send({
        message: "Bạn không có quyền xóa bài này!"
      })
    }
    } catch (error){
        res.status(500).send(error);
    }   
})

module.exports = router;
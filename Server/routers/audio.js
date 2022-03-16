const app = require("express");
const router = app.Router();
const userModel = require("../schemas/user.schema");
const audioModel = require("../schemas/audio.schema.js");
const artistModel = require("../schemas/artist.schema.js");
const { verifyAccessToken } = require("../configs/jwt_service");
const typeAudioModel = require('../schemas/type-audio.schema');
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
        console.log(err);
    }
});

router.get("/getDetail/:docId", async(request, response) => {
    try {
        let params = request.params.docId;
        let audio = await audioModel.findById(params).populate("authorId").populate("category");
        response.status(200).send(audio);
    } catch (err) {
        response.status(500).send(err);
    }
});

router.get("/getSearch", async(request, response, next) => {
    try {
        let searchfield = request.query.songName;
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

router.post("/add", (request, response) => {
    try {
        let data = request.body.data;
        let audio = new audioModel(data);
        audio.save(async(err, value) => {
            if (!err) {
                await artistModel.findByIdAndUpdate(
                    audio.authorId, { $push: { songs: audio._id } }
                );
                await typeAudioModel.findByIdAndUpdate(
                    audio.category, { $push: { audios: audio._id } }
                );
                response.status(201).send({
                    message: `Add successful`
                })
            }
        });
    } catch (err) {
        response.status(404).json({ message: err.toString() });
    }
});

router.put("/updateData", (request, response) => {
    try {
        let body = request.body;
        let data = body.data;
        let docId = body.docId;
        console.log(data);
    } catch (err) {
        response.status(404).json({ message: err.toString() });
    }
});

router.delete("/deleteAll", verifyAccessToken, async(request, response) => {
    try {
        const payLoad = request.payLoad;
        let docId = request.body.docId;

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
        // console.log(error);
        response.status(500).send(error);
    }
});

module.exports = router;
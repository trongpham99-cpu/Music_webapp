const app = require("express");
const { type } = require("os");
const audioModel = require("../schemas/audio.schema");
const typeAudioModel = require("../schemas/type-audio.schema");
const router = app.Router();

router.get("/getAll", async(request, response) => {
    try {
        let typeAudio = await typeAudioModel.find().populate("audios");
        response.status(200).send(typeAudio);
    } catch (err) {
        response.status(500).json({ message: err.toString() })
    }
});

router.post("/add", async(request, response) => {
    try {
        let data = request.body.data;
        const _typeAudio = {
            ...data,
            dateAdd: Date.now().toString(),
            audios: []
        }
        let temp = new typeAudioModel(_typeAudio);
        temp.save((err, value) => {
            response.status(200).json({
                message: "Thêm thành công",
                data: value,
            });
        })

    } catch (err) {
        response.status(500).json({ message: err.toString() })
    }
});

router.get("/getDetail/:docId", async(request, response) => {
    try {
        let params = request.params.docId;
        let typeAudio = await typeAudioModel.findById(params).populate("audios");
        response.status(200).send(typeAudio);
    } catch (err) {
        response.status(500).send(err);
    }
});

module.exports = router;
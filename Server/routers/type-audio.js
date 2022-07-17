const app = require("express");
const { type } = require("os");
const audioModel = require("../schemas/audio.schema");
const typeAudioModel = require("../schemas/type-audio.schema");
const router = app.Router();

router.get("/get-all", async (request, response) => {
  try {
    let typeAudio = await typeAudioModel
      .find()
      .populate("audios")
      .populate("createdBy");
    response.status(200).send(typeAudio);
  } catch (err) {
    response.status(500).json({ message: err.toString() });
  }
});

router.post("/add-new", async (request, response) => {
  try {
    let data = request.body;
    let type = new typeAudioModel(data);
    let _type = await type.save();
    response.status(201).json({
      message: "created type",
      data: _type,
    });
  } catch (err) {
    response.status(500).json({ message: err.toString() });
  }
});

router.get("/get-detail/:id", async (request, response) => {
  try {
    let params = request.params.id;
    let typeAudio = await typeAudioModel
      .findById(params)
      .populate("audios")
      .populate("createdBy");
    response.status(200).send(typeAudio);
  } catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;

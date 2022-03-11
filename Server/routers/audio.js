const app = require("express");
const { async } = require("rxjs");
const router = app.Router();

const audioModel = require("../schemas/audio.schema.js");
const artistModel = require("../schemas/artist.schema.js");

router.get("/getAll", async (request, response) => {
  try {
    let audio = await audioModel.find().populate("authorId");
    response.send(audio);
  } catch (err) {
    console.log(err);
  }
});

router.get("/getDetail/:docId", async (request, response) => {
  try {
    let params = request.params.docId;
    let audio = await audioModel.findById(params).populate("authorId");
    response.status(200).send(audio);
  } catch (err) {
    response.status(500).send(err);
  }
});

router.post("/add", (request, response) => {
  try {
    let data = request.body.data;
    let audio = new audioModel(data);
    audio.save((err, value) => {
      if (!err) {
        artistModel.findByIdAndUpdate(
          audio.authorId,
          {
            $push: { songs: audio._id },
          },
          (err, success) => {
            return response.status(201).send({
              message: `Add successfully !!!`,
              data: success
            })
          }
        );
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

router.delete("/deleteAll", async (request, response) => {
  try {
    let docId = request.body.docId;

    let result = await audioModel.findByIdAndDelete(docId);
    console.log(result);
    if (result == null) {
      response.status(400).send({
        message: `Tìm không được id ${docId} này!!!`,
      });
    } else {
      response.status(200).send({
        message: "Xoa thanh cong!!!",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

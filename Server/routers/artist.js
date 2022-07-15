const app = require("express");
const router = app.Router();
const artistModel = require("../schemas/artist.schema.js");

router.get("/get-all", async (request, response) => {
  try {
    let artist = await artistModel
      .find()
      .populate("songs")
      .populate("createdBy", "-password -role -library -likeSong");
    response.status(200).send(artist);
  } catch (err) {
    response.status(500).send(err);
  }
});

router.get("/get-detail/:id", async (request, response) => {
  try {
    let params = request.params.id;
    let artist = await artistModel
      .findById(params)
      .populate("songs")
      .populate("createdBy", "-password -role -library -likeSong");
    response.status(200).send(artist);
  } catch (error) {
    response.status(500).send(err);
  }
});

router.post("/add-new", async (request, response) => {
  try {
    let body = request.body;
    let artist = new artistModel(body);
    let _artist = await artist.save();
    response.status(201).json({
      message: "created artist",
      data: _artist,
    });
  } catch (err) {
    response.status(500).json({ message: err.toString() });
  }
});

module.exports = router;

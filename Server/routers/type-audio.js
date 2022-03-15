const app = require("express");
const { request } = require("http");
const typeAudioModel = require("../schemas/type-audio.schema");
const { response } = require("../server");
const router = app.Router();

router.get("/getAll", async(request, response) => {
    try {
        let typeAudio = await typeAudioModel.find();
        response.status(200).send(typeAudio);
    } catch (err) {
        console.log(err);
    }
});

router.post("/add", (request, response) => {
    try {
        let body = request.body;
        let data = body.data;
        console.log(data)
            //add dabaste
        let temp = new typeAudioModel(data);
        temp.save((error, value) => {
            //retrun response
            response.status(200).send({
                message: "Successful!!",
                data: value,
            })
        })
    } catch (error) {
        response.status(500).send(error);
    }
})



module.exports = router;
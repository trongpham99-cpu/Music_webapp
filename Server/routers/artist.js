const app = require("express");
const router = app.Router();
const artistModel = require("../schemas/artist.schema.js");

router.get('/getAll', async (request, response)=> {
    try{
        let artist = await artistModel.find().populate("songs");
        response.status(200).send(artist);
    }catch(err){
        response.status(500).send(err);
    }

})

router.get('/getDetail/:docId', async (request,response) => {
    try {
        let params = request.params.docId;
        let artist = await artistModel.findById(params).populate("songs");
        if(artist == null){
            return response.status(404).send({
                message: "Wrong id"
            })
        }
        response.status(200).send(artist);
    } catch (error) {
        response.status(500).send(err);
    }
    
})

router.get("/getSearch", async (request,response,next) => {
    try {
      let searchfield = request.query.artistName;
      await artistModel.find({artistName:{$regex: searchfield,$options: '$i'}}).populate("authorId")
      .then(data=>{
        response.status(201).send(data)
      })
    } catch (err) {
      response.status(500).send(err);
    }
  })

router.post("/add", (request,response) => {
    try{
        let data = request.body.data;
        // console.log(data)
        let temp = new artistModel(data);
        temp.save((err, value) => {
            response.status(200).json({
                message: "Thêm thành công",
                data: value,
            });
        })
        
    }catch(err){
        response.status(500).json({ message: err.toString() })
    }
})

router.put("/updateData", (request,response) => {
    try{
        let body = request.body;
        let data = body.data;
        let docId = body.docId;
        // console.log(data)
        artistModel.findByIdAndUpdate(docId,data,(err,value,res)=>{
            // console.log(err,value,res);
            response.status(200).json({
                message: "sửa thành công",
                // data:value,
            });
        })
    }catch(err){
        response.status(500).json({ message: err.toString() })
    }
    
});

router.delete("/deleteAll", async (request,response) => {
    try {
        let docId = request.body.docId;

        let result = await artistModel.findByIdAndDelete(docId);
        // console.log(result)
        if(result == null){
            response.status(404).send({
                message: `Tìm không được id ${docId} này!!!`
            })
        }else{
            response.status(200).send({
                message: "Xoa thanh cong!!!"
            })
        }

    } catch (error) {
        response.status(500).send(error)
    }
    
})

module.exports = router;
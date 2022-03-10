const app = require("express");
const { request } = require("http");
const { async } = require("rxjs");
const router = app.Router();
const audioModel = require("../schemas/audio.schema.js");
const { response } = require("../server");


router.get("/getAll", async (request, response) => {
    try{
        let audio = await audioModel.find();
        response.send(audio);
    }catch(err){
        console.log(err);
    }

});

router.get("/getDetail/:docId", (request,response) => {
    let params = request.params.docId;
    audioModel.findById(params,(err,docId) => {
        if(!err){
            response.json(docId)
        }
    })
});

router.post("/add", (request,response) => {
    try{
        let data = request.body.data;
        // console.log(data)
        let temp = new audioModel(data);
        temp.save((err, value) => {
            response.json({
                message: "Thêm thành công",
                data: value,
            });
        })
        
    }catch(err){
        response.status(404).json({ message: err.toString() })
    }
});

router.put("/updateData", (request,response) => {
    try{
        let body = request.body;
        let data = body.data;
        let docId = body.docId
        console.log(data)
        audioModel.findByIdAndUpdate(docId,data,(err,value,res)=>{
            console.log(err,value,res);
            response.json({
                message: "sửa thành công",
                // data:value,
            });
        })
    }catch(err){
        response.status(404).json({ message: err.toString() })
    }
    
});

router.delete("/deleteAll", async (request,response) => {
    try {
        let docId = request.body.docId;

        let result = await audioModel.findByIdAndDelete(docId);
        console.log(result)
        if(result == null){
            response.status(400).send({
                message: `Tìm không được id ${docId} này!!!`
            })
        }else{
            response.status(200).send({
                message: "Xoa thanh cong!!!"
            })
        }

    } catch (error) {
        console.log(error);
    }
    
})

module.exports = router;
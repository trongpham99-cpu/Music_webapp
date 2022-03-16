const { request, response } = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = require("express");
const router = app.Router();

const storage = multer.diskStorage({
    destination: (require, file, callback) => {
        callback(null, 'uploads')
    },
    filename: (require, file, callback) => {
        callback(null,`/uploads`)
    }
})  

const upload = multer({ storage: storage})

//let upload = multer({ dest: 'uploads/s'})

router.post("/file", upload.single('file'), (request,response,next) => {
    const file = request.file
    console.log(file.filename);
    if(!file) {
        const err = new Error('Please upload a file');
        err.httpStatusCode = 400;
        return next(err);
    }
    response.send(file)
}) 
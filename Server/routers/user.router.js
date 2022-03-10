
const userModel = require('../schemas/user.schema');
const app = require("express");
const createError = require('http-errors');
const router = app.Router();



router.get("/profile", async (req,res)=>{
    try {
        let user = await userModel.find()
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
    }
})

router.get("/profile/:id",async (req,res)=>{
    try {
        let _id = req.params.id;
        let user = await userModel.findById(_id)
        if (user == null){
            res.status(404).send({message:"Cannot found!"});
        }else{
        res.status(200).send(user);
        }
        
    } catch (error) {
        res.status(500).send({message:error});
        console.log(error);
    }
})


// router.post("/register", async (req,res)=>{
//     try {
//         let body = req.body;
     
//         let user = new userModel(body)
//         user.save().then((value)=>{
//             res.status(201).send(
//                 {message:"Successful",
//                 body: user
//             })
//         })
//     } catch (error) {
//         console.log(error);
//     }
// })

router.post("/register", async (req,res)=>{
    try {
        let body= req.body;
        let _email = req.body.email;
        let _password = req.body.password;
        // console.log(_email,password);
        if (!_email || !_password){
            throw createError.BadGateway();
        }

        const isExits = await userModel.findOne({email: _email });
        if (isExits){
           return  res.send(`${_email} already taken!`);
        }else {
            let user = new userModel(body)
         user.save().then((value)=>{
             res.status(201).send(
                {message:"Successful",
                 body: user
             })
         })
        }

        // const isCreate = await userModel.create({
        //     email: _email,
        //     password: _password
        // })

        // return res.status(201).send(
        //     {message:"Successful",
        //     body: user
        //      })

    } catch (error) {
        console.log(error);
    }
})
module.exports = router;



const JWT = require('jsonwebtoken');
const key = require("./key");
const createError = require('http-errors');
const signAccessToken = async (userID)=>{
    return new Promise ( (resolve,reject)=>{
        const payLoad={
            userID
        }
        const secret = key.ACCESS_TOKEN_SECRET;
        const option = {
            expiresIn: '1h'
        }
        JWT.sign(payLoad,secret,option,(err,token)=>{
            if (err) reject(err)
            resolve(token)
        })
    })
}

const verifyAccessToken = (req,res,next)=>{
    console.log(req.header['authorization']);
    if (!req.header['authorization']){
        return res.status(403).send({
            message: `Unauthorized`
        })
    }
    const authHeader = req.header['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    console.log(token);

    JWT.verify(token, key.ACCESS_TOKEN_SECRET, (err,payLoad)=>{
        if (err){
            return res.status(403).send({
                message: `Unauthorized`
            })
        }
        req.payLoad = payLoad;
        next();
    })
}

module.exports = {
    signAccessToken,
    verifyAccessToken
}
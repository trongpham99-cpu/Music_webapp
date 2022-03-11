const JWT = require('jsonwebtoken');

const signAccessToken = async (userID)=>{
    return new Promise ( (resolve,reject)=>{
        const payLoad={
            userID
        }
        const secret = "KET SECRET";
        const option = {
            expiresIn: '1h'
        }
        JWT.sign(payLoad,secret,option,(err,token)=>{
            if (err) reject(err)
            resolve(token)
        })
    })
}

module.exports = {
    signAccessToken
}
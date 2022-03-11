const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema(
    {
        displayName:String,
        account:{
            type:String,
            lowercase: true,
            unique: true,
            required: true
        }, 
        password:{
            type:String,
            require: true
        }, 
        birthday: String,
        phonenumber:{
            type: String,
            unique: true,
            required: true,
            
        },
        email:{
            type:String,
            lowercase: true,
            unique: true,
            required: true
        },
        country: String,
        photo: String,
        Gender: String,
        createDate: String,
        musicType: String,
        updateDate: String,
        Role: String,
        library:Array,
        likeSong:Array,
        Follow: Array

    }
)

const userModel = mongoose.model('users',userSchema);
module.exports = userModel;
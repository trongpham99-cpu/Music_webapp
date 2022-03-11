const mongoose = require ('mongoose');
const bcrypt = require ("bcrypt");
const { debug } = require('console');
const userSchema = new mongoose.Schema(
    {
        displayName:String,
        account:{
            type:String,
            lowercase: true,
            unique: true,            
        }, 
        password:{
            type:String,
            require: true,
        }, 
        birthday: String,
        phonenumber:{
            type: String,
            unique: true,
            
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
);

// userSchema.pre("save", async (next)=>{
//     try {
//         console.log("Email pass la: ",this.email,this.password)
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(this.password,salt);
//         this.password = hashPassword;
//         next();
//     } catch (error) {
//         next(error);
//     }
// })

userSchema.pre('save', async function(next){
    try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt )
        this.password = hashPassword;
        console.log(hashPassword);
        next();
    } catch (error) {
        console.log(error)
    }
});

userSchema.methods.isCheckPassword = async function(password){
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        next(error);
    }
}

const userModel = mongoose.model('users',userSchema);
module.exports = userModel;
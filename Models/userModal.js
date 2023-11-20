const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema =new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please Provide a valid email"]
    },
    photo: String,
    password: {
        type: String,
        required: [true, "Please Enter your password"],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please Confirm your password"],
        validator: {
            validator: function (el) {
                return el === this.password
            },
            message: "Password are not the same!"
        },
    },
    passwordCreatedAt:{
        type:Date,
        select: false
    },
    passwordResetToken:String,
    passwordResetExpires:Date,
    active:{
        type:Boolean,
        default:true,
        select:false
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined;
    next();
})

userSchema.pre("save",async function (next){
    if (!this.isModified('password')) return next();

    this.passwordCreatedAt=Date.now();
    next();
})

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
){
return await bcrypt.compare(candidatePassword,userPassword)
}


const User = mongoose.model("user", userSchema)

module.exports = User
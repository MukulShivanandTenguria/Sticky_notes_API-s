const User = require("../Models/userModal")
const AppError = require("../utils/appError")
const multer  = require('multer');


const multerStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/img/users');
    },
    filename:(req,file,cd)=>{
        const ext= file.mimetype.split('/')[1]
        cd(null,`user-${req.user.id}-${Date.now()}.${ext}`)
    }
})
const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith("image")){
        cb(null,true)
    }else{
        cb(new AppError("Not an image! Please upload only image",400),false)
    }
}
const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
})

exports.uploadUserPhoto = upload.single("photo")

exports.getAllUser = async(req,res,next) => {
    const uses = await User.find()
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    res.cookie('example', "token", cookieOptions);
    res.setHeader('Set-Cookie', 'myCookie=cookieValue; Max-Age=3600; HttpOnly; SameSite=None; Secure');

    res.status(200).json({
        status:"success",
        data:{uses}
    })
}

exports.updateProfile = async(req,res) => {
    console.log(req.body);
    console.log(req.file);

    res.status(200).json({
        status:"success",
        url:`http://localhost:3000/${req.file.filename}`
    })
}
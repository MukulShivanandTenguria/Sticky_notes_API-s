const User = require("../Models/userModal")
const jwt = require("jsonwebtoken")
const catchAsync = require("../utils/catchAsync")
const {promisify} = require("util") 
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}
const createSendToken = (newUser, res) => {
    const token = signToken(newUser._id)
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwtToken', token, cookieOptions);
    
    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        token: token,
        data: {
            user: newUser
        }
    })
}
exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })
    createSendToken(newUser, res)
})

exports.login = catchAsync(async (req, res, next) => {
    // console.log('user', req.headers.authorization);
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({
            status: "fail",
            errors: {
                error: "Please provide email and password!"
            }
        })
    }
    const user = await User.findOne({ email }).select("+password")
    if (!user || !(await user.correctPassword(password, user.password))) {
        res.status(401).json({
            status: "fail",
            errors: {
                error: "Incorrect email or password"
            }
        })
    }

    createSendToken(user, res)
})

exports.protect = catchAsync(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        res.status(401).json({
            status: "fail",
            errors: {
                error: "You are not logged in! Please log in to get access"
            }
        })
    }

    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)

    const currentUser = await User.findById(decoded.id)

    if(!currentUser) {
        res.status(401).json({
            status: "fail",
            errors: {
                error: "The user belongs to this token does not longer exist"
            }
        })
    }

    req.user = currentUser
    next()
})

exports.logout = async (req,res,next)=>{
    res.cookie('jwtToken', '', {
        maxAge:1
      });
      res.status(200).json({ status: 'success' });
}
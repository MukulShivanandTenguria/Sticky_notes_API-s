const User = require("../Models/userModal")

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
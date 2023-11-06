const User = require("../Models/userModal")

exports.getAllUser = async(req,res,next) => {
    const uses = await User.find()
    res.status(200).json({
        status:"success",
        data:{uses}
    })
}
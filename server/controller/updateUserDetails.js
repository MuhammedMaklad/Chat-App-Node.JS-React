

const getUserFromToken = require("../helpers/getUserFromToken");
const {StatusCodes} = require("http-status-codes");
const UserModel = require("../models/user.model");

const updateUserDetails = async (req, res) => {
    const token = req.cookies.token ?? "";

    const user = await getUserFromToken(token);

    if(user.logout){
        res.status(StatusCodes.UNAUTHORIZED).json({
            message:user.message,
            success:false
        })
    }
    const {name, profilePicture} = req.body;

    const updatedUser = await UserModel.findOneAndUpdate(user._id, {name,profilePicture});
    res.status(StatusCodes.OK).json({
        message: "User details updated successfully",
        success: true,
        updatedUser
    });
}

module.exports = updateUserDetails;
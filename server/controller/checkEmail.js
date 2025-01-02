
const BadRequestError = require("../errors/BadRequestError");
const UserModel = require("../models/user.model");
const {StatusCodes} = require('http-status-codes');

const checkEmail = async (req, res) => {
    const {email} = req.body;

    if(!email)
        throw  new BadRequestError("Please Provide Email");

    const user = await UserModel.findOne({email: email});
    if (!user)
        throw new BadRequestError("Email not found");

    res.status(StatusCodes.CONTINUE).json({
        message: "Email is valid",
        success:true,
        data:user
    });
}
module.exports = checkEmail;
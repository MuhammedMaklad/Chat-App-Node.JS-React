
const BadRequestError = require("../errors/BadRequestError");
const UserModel = require("../models/user.model");
const {StatusCodes} = require('http-status-codes');
const UnAuthorizedError = require("../errors/UnAuthorizedError");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


const checkPassword = async (req, res) => {
    const {userId, password} = req.body;
    if (!userId || !password)
        throw new BadRequestError("Please Provide Required Fields.");

    const user = await UserModel.findById(userId).select("+password");
    if (!user) throw new  BadRequestError("Please Provide correct user id.");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
        throw new UnAuthorizedError("Invalid Password.");

    const payload = {
        userId: user._id,
        username: user.username,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});

    const cookieOptions = {
        http: true,
        secure: true
    }
    res.status(StatusCodes.OK).cookie('token', token, cookieOptions).json({
        message: "Password Matches.",
        token: token,
        success: true
    });
}

module.exports = checkPassword;
const BadRequestError = require("../errors/BadRequestError");
const UserModel = require("../models/user.model");
const UnAuthorizedError = require("../errors/UnAuthorizedError");
const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const loginUserController = async (req, res) => {

    console.log(req.body)
    const {email, password} = req.body;
    if (!email ||!password)
        throw new BadRequestError("Please provide required fields");

    // checking email
    const user = await UserModel.findOne({email: email}).select("+password");
    if (!user) throw new BadRequestError("Email not found");

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnAuthorizedError("InValid Credentials");

    const payload = {
        userId: user._id,
        username: user.name,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});

    const cookieOptions = {
        http: true,
        secure: true
    }
    res.status(StatusCodes.OK).cookie('token', token, cookieOptions).json({
        message: "Logged in successfully.",
        token: token,
        username:user.name,
        email,
        success: true
    });
}


module.exports = loginUserController;
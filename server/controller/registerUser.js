const BadRequestError = require("../errors/BadRequestError");
const UserModel = require("../models/user.model");
const {StatusCodes} = require('http-status-codes');
const registerUser = async (req, res) => {
    const {name, email, password, profilePicture} = req.body;
    if(!name || !email || !password)
        throw new BadRequestError("Please Fill Required Fields");

    // Check if email is already registered
    const user = UserModel.findOne({ email: email});
    if(user)
        throw new BadRequestError("Email already registered");
    const payload = {
        name,
        email,
        password,
        profilePicture: profilePicture ?? ""
    }
    const newUser = new UserModel(payload);
    const saved = await newUser.save();

    return res.status(StatusCodes.CREATED).json({
        message:"User Registration Success",
        success:true,
        data:saved
    })
}

module.exports = registerUser;
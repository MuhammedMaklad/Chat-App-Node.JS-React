const BadRequestError = require("../errors/BadRequestError");
const UserModel = require("../models/user.model");
const {StatusCodes} = require('http-status-codes');
const registerUser = async (req, res) => {
    const {name, email, password, profilePicture} = req.body;
    console.log(name,email, password)
    if(!name || !email || !password)
        throw new BadRequestError("Please Fill Required Fields");

    // Check if email is already registered
    const user = await UserModel.findOne({ email: email});
    console.log(user)
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
        data:{
            username:saved.name,
            email: saved.email,
        }
    })
}

module.exports = registerUser;
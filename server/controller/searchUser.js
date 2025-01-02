const BadRequestError = require("../errors/BadRequestError");
const UserModel = require("../models/user.model");
const {StatusCodes} = require("http-status-codes");


const searchUser = async (req, res) => {
    const {search} = req.body;
    if(!search)
        throw new BadRequestError("Please provide a required field")

    const query = new RegExp(search, "i");

    const data = await UserModel.find({
        $or:[
            {name:query},
            {email:query}
        ]
    })
    res.status(StatusCodes.OK).json({
        message:"fetched user successfully",
        users:data
    })
}

module.exports = searchUser;
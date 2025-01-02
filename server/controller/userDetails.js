import {StatusCodes} from "http-status-codes";
const getUserFromToken = require("../helpers/getUserFromToken");

const userDetails = async (req, res) => {
    const token = req.cookies.token ?? "";
    const user = await getUserFromToken(token);

    res.status(StatusCodes.OK).json({
        message: "User details fetched successfully",
        success:true,
        user: user,
    })
}

module.exports = userDetails;
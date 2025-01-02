const {StatusCodes} = require("http-status-codes");

const logout = async function (request, response) {
    response.clearCookie("token");
    response.status(StatusCodes.OK).json({
        message:"User logged out",
    })
}

module.exports = logout;
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");
async function getUserFromToken(token) {
    if(!token)
        return {
            message:"session expired",
            logout:true,
        };

    const payload = await jwt.decode(token, process.env['JWT_SECRET']);
    const user =  await UserModel.findById(payload.userId);
    return user;
}

module.exports = getUserFromToken;
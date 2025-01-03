const {StatusCodes} = require('http-status-codes')

const NotFoundMiddleware = (req, res) =>{
    return res.status(StatusCodes.NOT_FOUND).json({
        message:"This page not found",
        error:true
    })
}

module.exports = NotFoundMiddleware;
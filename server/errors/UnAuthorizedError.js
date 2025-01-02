
const {StatusCodes} = require("http-status-codes");
const CustomApiError = require("CustomApiError");

class UnAuthorizedError extends CustomApiError{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnAuthorizedError;
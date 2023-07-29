import { StatusCodes } from "http-status-codes"
import customApiError from "./custom-api.js"

class BadRequestError extends customApiError {
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export default BadRequestError
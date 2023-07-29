import { StatusCodes } from "http-status-codes"
import customApiError from "./custom-api.js"

class ServerError extends customApiError {
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    }
}

export default ServerError
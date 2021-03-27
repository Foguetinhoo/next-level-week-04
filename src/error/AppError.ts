import { Response } from "express"

class AppError{
    public readonly message: string
    public readonly statusCode: number
    public readonly response:Response
    
    constructor(message: string,  codeStatus = 400) {
        this.message = message
        this.statusCode = codeStatus
    }
}
export {AppError}
import { NextFunction, Request, Response } from 'express';
import {Middleware} from 'routing-controllers'

@Middleware({type: 'after'})
export class ErrorHandler {
    error(error: any, request: Request, response: Response, next: NextFunction){
        response.status(400)

        const responseJSONError = {
            code: response.statusCode,
            message: error.message,
            errors: error.errors
        }

        response.json(responseJSONError)
    
        next()
    }
}
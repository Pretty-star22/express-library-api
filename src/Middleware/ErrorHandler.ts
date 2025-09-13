import { error } from "console";
import { Request,Response,NextFunction } from "express";

export const handleError = ((err:Error, req:Request, res:Response, next:NextFunction) => {
    console.error('error:', err.message)
    
    let statusCode = 0;

     if(err.message.includes('not found')){
         statusCode=404
    }else if(err.message.includes('already exists')){
        statusCode = 409
    }else if(err.message.includes('required')){
        statusCode = 400
    }else{
        statusCode = 500
    }

    res.status(statusCode).json({
        "success":false,
        "message":err.message || 'internal server error'
    })
})
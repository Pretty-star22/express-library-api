import { Request, Response, NextFunction } from "express"

export const logger = (req:Request, res:Response, next:NextFunction) => {
  const timeStamp = new Date().toISOString();
  console.log("the time is",timeStamp);
  next()
  
}
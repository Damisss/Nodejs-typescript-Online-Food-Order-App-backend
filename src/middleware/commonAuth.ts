import {Request, Response, NextFunction} from 'express'
import {decodeToken} from '../utils/passwordUtility'
import {VendorPayload} from '../dto'

export interface RequestWithUser extends Request {
  user?: VendorPayload;
}

export const authenticate = async (req:Request, res:Response, next:NextFunction)=>{
  try {
    const validate = decodeToken(req)
    
    if (validate){
      next()
      return
    }
    return res.json({message: 'Unauthorized'})
    
  } catch (error) {
    console.log(error)
  }
}
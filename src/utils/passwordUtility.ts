import bcrypt from 'bcrypt'
//import {Request} from 'express'
import jwt from 'jsonwebtoken'


import {VendorPayload} from '../dto'
import {RequestWithUser} from '../middleware'
import {APP_SECRET_KEY} from '../config'




const generateSalt = async (num: number): Promise<string | void> =>{
  try {
    return await bcrypt.genSalt(12)
  } catch (error) {
    console.log(error)
  }
  
}

const hashPassword = async (password: string, salt:string): Promise<string | void> =>{
  try {
    return await bcrypt.hash(password, salt)
    
  } catch (error) {
    console.log(error)
  }
  
}

const comparePassword = async (enteredPassword:string, savedPassword:string, salt:string): Promise<boolean | void>=>{
  try {
    return await hashPassword(enteredPassword, salt) === savedPassword
  } catch (error) {
    console.log(error)
  
  }
}

const genJWToken = (payload:VendorPayload): string | void =>{
  try {
        return jwt.sign(payload, APP_SECRET_KEY)
  } catch (error) {
      console.log(error)
  }
}

const decodeToken =  (req:RequestWithUser): boolean | void=>{
  try {
    
    const signature = req.get('Authorization')
  
    if (!signature){
      const err = new Error('Unauthorized')
     // err.statusCode = 401
      throw err
    }
    console.log(signature)
    if (signature){
      try {
        const payload =  jwt.verify(signature.split(" ")[1], APP_SECRET_KEY) as VendorPayload

        if (payload){
          req.user = payload
          return true
        }
        
      } catch (error) {
        throw new Error('Unauthorized')
      }
      
    }

    return false
    
  } catch (error) {
    throw error
  }
}


export {
  generateSalt,
  hashPassword,
  comparePassword,
  genJWToken,
  decodeToken
}
import {Request, Response, NextFunction} from 'express'
import {get, post, patch, put, controller} from './decorators'
import {hashPassword, generateSalt} from '../utils'
import {VendorData} from '../dto'
import {Vendor} from '../models'

export interface RequestWithBody extends Request {
  body:{[key:string]: string};
}
interface Exception extends Error{
  statusCode:number;
}

@controller('/admin')
export class Controllers {

  @post('/create-vendor')
  async createVendor (req:Request, res:Response, next:NextFunction): Promise<any> {
    try {
      const {
        address,
        email, 
        foodTypes,  
        name, 
        ownerName, 
        password,
        phone,
        pinCode,
        serviceAvailable,
        coverImages,
        rating,
      } = <VendorData> req.body
    
      const vendorExists = await Vendor.findOne({email: email})
  
      if (vendorExists){
        const err = new Error('This vendor already exist.') as Exception
        err.statusCode = 401
         throw err
      } 
      
      const generatedSalt = await generateSalt(12) as string
      const userPassword = await hashPassword(password, generatedSalt)
  
      const vendor = await Vendor.create({
        address,
        email, 
        foodTypes,  
        name, 
        ownerName, 
        password: userPassword,
        phone,
        pinCode,
        salt:generatedSalt,
        serviceAvailable,
        coverImages,
        rating,
        foods:[]
      })
      
     return res.status(201).json(vendor)
      
    } catch (error) {
      if(!error.statusCode){
        error.statusCode = 500
      }
      next(error) 
      return error
    }
    
    

  }
  @get('/vendors')
  async getVendors (req:Request, res:Response, next:NextFunction): Promise<any> {
    try {
      const vendors = await Vendor.find()
      if (!vendors.length){
        const err = new Error('No vendor found') as Exception
        err.statusCode= 401
        throw err
      }
      
      return res.status(200).json(vendors)

    } catch (error) {
      if(!error.statusCode){
        error.statusCode = 500
      }
      next(error) 
      return error
    }


  }
  @get('/vendor/:vendorId')
  async getVendorById (req:Request, res:Response, next:NextFunction): Promise<any> {
    try {
      const id = req.params.vendorId
      const vendor = await Vendor.findById(id)
      if (!vendor){
        const err = new Error('No such vendor') as Exception
        err.statusCode= 401
        throw err
      } 
      res.status(200).json(vendor)
      return {statusCode: 200, vendor}
      
    } catch (error) {
      if(!error.statusCode){
        error.statusCode = 500
      }
      next(error) 
      return error
      //return new Error('Something went wrong file fetching vendor')
    }
  }

}

//export {Controllers}
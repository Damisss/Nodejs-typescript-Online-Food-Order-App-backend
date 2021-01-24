import {Request, Response, NextFunction} from 'express'
import multer from 'multer'
 
import {comparePassword, genJWToken} from '../utils'
import {Vendor, Food, VendorDoc} from '../models'
import {get, post, patch, del, put, controller, useMiddleware} from './decorators'
import {VendorLogin, EditVendorInput, CreateFood} from '../dto'
import {RequestWithUser, authenticate, images} from '../middleware'



interface Exception extends Error{
  statusCode:number;
}

@controller('/vendor')
export class VendorController {
  @post('/login')
  async vendorLoggin(req: Request, res:Response, next: NextFunction): Promise<any>{
    try {
      const {email, password} = <VendorLogin>req.body
      const vendor= await Vendor.findOne({email: email}) as VendorDoc

      if (!vendor){
        const err = new Error('wrong email or password') as Exception
          err.statusCode= 401
          throw err
      
      }

      const isMatch = await comparePassword(password, vendor.password, vendor.salt)

        if (!isMatch){
          const err = new Error('wrong email or password') as Exception
          err.statusCode= 401
          throw err
        }
        const payload = {
          _id: vendor._id,
          email: vendor.email,
          foodTypes: vendor.foodTypes,
        } 
        const token = genJWToken(payload)
        res.status(200).json(token)
        return token 


    } catch (error) {
      if(!error.statusCode){
        error.statusCode = 500
        //return error
      }
     next(error)
     return error
    }

  }
  @get('/profile')
  @useMiddleware(authenticate)
  async getVendorProfile  (req: RequestWithUser, res:Response, next: NextFunction){
    try {
      const vendorInfo = req.user

      if(!vendorInfo){
       const err = new Error('UnAuthorized') as Exception
       err.statusCode = 401
       throw err
      }

      const existingVendor = await Vendor.findById(vendorInfo._id)
      
      if(!existingVendor){
        const err = new Error('vendor not found') as Exception
        err.statusCode = 404
        throw err
       }
      
      return res.status(200).json(existingVendor)
      
    } catch (error) {
      if (!error.statusCode){
        error.statusCode = 500
        //return error
      }
      next(error)
      return error
    }

  }

  @patch('/profile/update')
  @useMiddleware(authenticate)
  async updateVendorProdile (req: RequestWithUser, res:Response, next: NextFunction){
    try {
      const vendor = req.user
      const {name, foodTypes, email, address, phone} = <EditVendorInput>req.body

      if(!vendor){
        const err = new Error('UnAuthorized') as Exception
        err.statusCode = 401
        throw err
      }

      const existingVendor = await Vendor.findById(vendor._id)
      if (!existingVendor){
        const err = new Error('Vendor not found') as Exception
        err.statusCode = 404
        throw err

      }

      existingVendor.name = name && name  || existingVendor.name
      existingVendor.foodTypes = foodTypes && foodTypes ||  existingVendor.foodTypes
      existingVendor.email = email && email || existingVendor.email
      existingVendor.address = address && address || existingVendor.address
      existingVendor.phone = phone && phone || existingVendor.phone

      const updatedVendor = await existingVendor.save()

      return res.status(200).json(updatedVendor)
      
    } catch (error) {
      if (!error.statusCode){
        error.statusCode = 500
      }
      next(error)

      return error
    }

  }

  @patch('/update-service')
  @useMiddleware(authenticate)
  async updateService (req: RequestWithUser, res:Response, next: NextFunction){
    try {
      const vendor = req.user
      if(!vendor){
        const err = new Error('UnAuthorized') as Exception
        err.statusCode = 401
        throw err
      }

      const existingVendor = await Vendor.findById(vendor._id)
      if (!existingVendor){
        const err = new Error('Vendor not found') as Exception
        err.statusCode = 404
        throw err

      }

      existingVendor.serviceAvailable = !existingVendor.serviceAvailable
      const updatedVendor = await existingVendor.save()

      return res.status(200).json(updatedVendor)
    
    } catch (error) {
      if (!error.statusCode){
        error.statusCode = 500
      }
      next(error)

      return error
    }
  }

  @post('/add-food')
  @useMiddleware(authenticate)
  @useMiddleware(images)
  async addFood (req: RequestWithUser, res:Response, next: NextFunction){
    try {
      const vendor = req.user
      const {
        name, 
        foodType, 
        price, 
        description, 
        readyTime, 
        category, 
      } = <CreateFood>req.body

      if(!vendor){
        const err = new Error('UnAuthorized') as Exception
        err.statusCode = 401
        throw err
      }

      const files = req.files as [Express.Multer.File]
      const images = files.map((file: Express.Multer.File)=>file.filename)
        
      const existingVendor = await Vendor.findById(vendor._id)
      if (!existingVendor){
        const err = new Error('Vendor not found') as Exception
        err.statusCode = 404
        throw err

      }

      const food = await Food.create({
        vendorId: vendor._id,
        name,
        description,
        category, 
        foodType,
        readyTime,
        price,
        rating:0,
        images:[...images],
      })

      existingVendor.foods.push(food)
      const updatedvendor = await existingVendor.save()
      return res.status(201).json(updatedvendor)
      
    } catch (error) {
      if (!error.statusCode){
        error.statusCode = 500
      }
      next(error)

      return error
      
    }
  }

  @get('/foods')
  @useMiddleware(authenticate)
  async getFoods (req: RequestWithUser, res:Response, next: NextFunction){
    try {
      const vendor = req.user
      if(!vendor){
        const err = new Error('UnAuthorized') as Exception
        err.statusCode = 401
        throw err
      }
      const existingVendor = await Vendor.findById({_id: vendor._id})
      if (!existingVendor){
        const err = new Error('Vendor not found') as Exception
        err.statusCode = 404
        throw err

      }

      const foods = await Food.find({vendorId: vendor._id})
      return res.status(200).json(foods)

    } catch (error) {
      if (!error.statusCode){
        error.statusCode = 500
      }
      next(error)
      
      return error
    }
  }

  @patch('/add-cover-images')
  @useMiddleware(authenticate)
  @useMiddleware(images)
  async addCoverImages (req: RequestWithUser, res:Response, next: NextFunction){
    try {
      const vendor = req.user
      if(!vendor){
        const err = new Error('UnAuthorized') as Exception
        err.statusCode = 401
        throw err
      }

      const files = req.files as [Express.Multer.File]
      const images = files.map((file: Express.Multer.File)=>file.filename)

      const existingVendor = await Vendor.findById(vendor._id)
      
      if (!existingVendor){
        const err = new Error('Vendor not found') as Exception
        err.statusCode = 404
        throw err

      }
      existingVendor.coverImages.push(...images)
      const updatedvendor = await existingVendor.save()
      return res.status(200).json(updatedvendor)

    } catch (error) {
      if (!error.statusCode){
        error.statusCode = 500
      }
      next(error)
      
      return error
    }
  }
}
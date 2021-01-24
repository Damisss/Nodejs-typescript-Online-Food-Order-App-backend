import {expect} from 'chai'
import sinon from 'sinon'
import mongoose from 'mongoose'
import {Response} from 'express'

import {VendorController} from '../src/controllers/vendorController'
import {Controllers} from '../src/controllers/adminController'
import {Vendor} from '../src/models'
import {MONGODB_TEST_URL} from '../src/config'
import {VendorBuilder} from '../src/utils/models/defaultVendors'
import { VendorData } from '../src/dto'

interface ResponseWithJson extends Response {
  json():this;
  existingVendor?: any;
  token?: string;
  foods?:any;
}

describe('vendor', ()=>{
  let vendorController: VendorController
  let adminController: Controllers
  beforeEach(async()=>{
    vendorController = new VendorController()
    adminController = new Controllers()
  })
  
  const id = '5c0f66b979af55031b34728a'
  it('it should throw an error with 500 if accessing database fails', async ()=>{
    sinon.stub(Vendor, 'findOne')
    Vendor.findOne.throws()

    const res = {
      status(code:number){
        return this
      },
      json(existingVendor:any){}
    } as ResponseWithJson

    const next = ()=>{}
   
    const req:any ={
      body:{
        email: 'sam@sam.com',
        password: 'abc12345'
      }
    }
    
    const err = await vendorController.vendorLoggin(req, res, next)
    expect(err).to.be.an('error')
    expect(err.statusCode).to.equal(500)

    Vendor.findOne.restore()
  })

  describe('vendor endpoints', ()=>{
    beforeEach(async ()=>{
      await mongoose.connect(MONGODB_TEST_URL, {
        useUnifiedTopology:true,
        useCreateIndex: true,
        useNewUrlParser: true
      })

      const vendor = new VendorBuilder()
        .withId(id)
        .build()
      
      const req:any ={
        body: vendor
      }
      const res = {
        status(code:number){
          return this
        },
        json(existingVendor:any){}
      } as ResponseWithJson

      const next = ()=>{}

      await adminController.createVendor(req, res, next)
    })

    afterEach(async()=>{
      await Vendor.deleteMany({})
      await mongoose.disconnect()
    })

    context('vendor login', ()=>{
      it('it should throw an error if vendor\'s email not found', async ()=>{
      
        const req:any = {
          body:{
            email: 'sam@sam.com',
            password: 'abc12345'
          }
        }
        const res = {
          statusCode: 500,
          token: '',
          status(code:number){
            this.statusCode = code
            return this
          },
          json(token:string){
            this.token = token
  
          }
        } as ResponseWithJson

        const next = ()=>{}
         
         await vendorController.vendorLoggin(req, res, next)
         expect(res.token).to.be.an('string')
         expect(res.statusCode).to.equal(200)
  
      })


    })

    context('vendor profile', ()=>{
      it('fetch vendor profile when he/she is login', async()=>{
        const vendors = await Vendor.find()
        const vendorId = vendors[0]._doc._id.toString()
  
        const req:any = {
          user:{
            _id: vendorId,
            email:'sam@sam.com' ,
            foodTypes: ['vegan'],
          }
        }
        
        const res = {
          existingVendor: null,
          statusCode: 500,
          status(code){
            this.statusCode = code
            return this
          },
          json(existingVendor:any){
            this.existingVendor = existingVendor
          }
        } as ResponseWithJson
  
        const next = ()=>{}
       
        await vendorController.getVendorProfile(req, res, next)
        expect(res.statusCode).to.equal(200)
        expect(res.existingVendor).to.have.property('email', 'sam@sam.com')
  
      })
      it('it should throw an error if user is not found', async()=>{
        const req:any = {
          user:{
            _id: id,
            email:'sam@sam.com' ,
            foodTypes: ['vegan'],
          }
        }
        
        const res = {
          status(code:number){
            return this
          },
          json(existingVendor:any){}
        } as ResponseWithJson
  
        const next = ()=>{}
       
        const error = await vendorController.getVendorProfile(req, res, next)
        expect(error.statusCode).to.equal(404)
        expect(error).to.have.property('message', 'vendor not found')
        
      })
      it('it should return an unauthorized message if user is not logged in ', async ()=>{
        const req:any = {}
        const res = {
          status(code:number){
            return this
          },
          json(existingVendor:any){}
        } as ResponseWithJson
  
        const next = ()=>{}
       
        const error = await vendorController.getVendorProfile(req, res, next)
        expect(error.statusCode).to.equal(401)
        expect(error).to.have.property('message', 'UnAuthorized')
      })

    })

    context('update vendor', ()=>{
      it('it should update vendor profile', async ()=>{
        const vendors = await Vendor.find()
        const vendorId = vendors[0]._doc._id.toString()
  
        const req:any = {
          user:{
            _id: vendorId,
            email:'sam@sam.com' ,
            foodTypes: ['vegan'],
          },
          body:{
            email: 'damis@damis.com',
            name: 'updated restaurant name'
          }
        }
        
        const res = {
          existingVendor: null,
          statusCode: 500,
          status(code){
            this.statusCode = code
            return this
          },
          json(existingVendor:any){
            this.existingVendor = existingVendor
          }
        } as ResponseWithJson

        const next = ()=>{}

        await vendorController.updateVendorProdile(req, res, next)
        expect(res.statusCode).to.equal(200)
        expect(res.existingVendor).to.have.property('name', 'updated restaurant name')
        expect(res.existingVendor).to.have.property('email', 'damis@damis.com')
      })

      it('it should return an error if vendor doesn\'t exist', async ()=>{
       
        const req:any = {
          user:{
            _id: id,
            email:'sam@sam.com' ,
            foodTypes: ['vegan'],
          },
          body:{
            email: 'damis@damis.com',
            name: 'updated restaurant name'
          }
        }
        
        const res = {
          status(code){
            return this
          },
          json(existingVendor:any){}
        } as ResponseWithJson

        const next = ()=>{}

        const error = await vendorController.updateVendorProdile(req, res, next)
        expect(error.statusCode).to.equal(404)
        expect(error.message).to.equal('Vendor not found')
      })

      it('it should return if vendor is not logged in', async ()=>{
        
        const req:any = {
          body:{
            email: 'damis@damis.com',
            name: 'updated restaurant name'
          }
        }
        
        const res:any = {
          status(){
            return this
          },
          json(){}
        }
  
        const next = ()=>{}

        const error = await vendorController.updateVendorProdile(req, res, next)
        expect(error.statusCode).to.equal(401)
        expect(error.message).to.equal('UnAuthorized')
      })

    })

    context('update service', ()=>{
      it('it should return if vendor is not logged in', async ()=>{
        
        const req:any = {}
        
        const res = {
          status(code:number){
            return this
          },
          json(existingVendor:any){}
        } as ResponseWithJson
  
        const next = ()=>{}

        const error = await vendorController.updateService(req, res, next)
        expect(error.statusCode).to.equal(401)
        expect(error.message).to.equal('UnAuthorized')
      })

      it('it should return an error if vendor is not found', async ()=>{
       
        const req:any = {
          user:{
            _id: id,
            email:'sam@sam.com' ,
            foodTypes: ['vegan'],
          },
        }
        
        const res = {
          status(code:number){
            return this
          },
          json(existingVendor:any){}
        } as ResponseWithJson

        const next = ()=>{}

        const error = await vendorController.updateService(req, res, next)
        expect(error.statusCode).to.equal(404)
        expect(error.message).to.equal('Vendor not found')
      })

      it('it should update service', async ()=>{
        const vendors = await Vendor.find()
        const vendorId = vendors[0]._doc._id.toString()
  
        const req:any = {
          user:{
            _id: vendorId,
            email:'sam@sam.com' ,
            foodTypes: ['vegan'],
          },
        }
        
        const res = {
          existingVendor: null,
          statusCode: 500,
          status(code:number){
            this.statusCode = code
            return this
          },
          json(existingVendor:any){
            this.existingVendor = existingVendor
          }
        } as ResponseWithJson

        const next = ()=>{}

        await vendorController.updateService(req, res, next)
        expect(res.statusCode).to.equal(200)
        expect(res.existingVendor).to.have.property('serviceAvailable', true)
      })

    })

    context('food', ()=>{
      it('it should return if vendor is not logged in', async ()=>{
        const req:any = {
          body:{
          name:'pizza', 
          foodType:'vegan', 
          price: 5, 
          description:'San Marzano tomato sauce, fresh mozzarella, grated parmesan and pepperoni from Il Mondo Vecchio', 
          readyTime:1, // one hour
          category:'vegan'
          },
          files:[{filename:'image1_path'}, {filename:'image2_path'}]
        }
        
        const res = {
          status(code:number){
            return this
          },
          json(existingVendor:any){}
        } as ResponseWithJson
  
        const next = ()=>{}

        const error = await vendorController.addFood(req, res, next)
        expect(error.statusCode).to.equal(401)
        expect(error.message).to.equal('UnAuthorized')
      })

      it('it should return an error if vendor is not found', async ()=>{
       
        const req:any = {
          user:{
            _id: id,
            email:'sam@sam.com' ,
            foodTypes: ['vegan'],
          },
          body:{
            name:'pizza', 
            foodType:'vegan', 
            price: 5, 
            description:'San Marzano tomato sauce, fresh mozzarella, grated parmesan and pepperoni from Il Mondo Vecchio', 
            readyTime:1, // one hour
            category:'vegan'
          },
          files:[{filename:'image1_path'}, {filename:'image2_path'}]
        }
        
        const res = {
          status(code:number){
            return this
          },
          json(existingVendor:any){}
        } as ResponseWithJson

        const next = ()=>{}

        const error = await vendorController.addFood(req, res, next)
        expect(error.statusCode).to.equal(404)
        expect(error.message).to.equal('Vendor not found')
      })

      it('it should add food ',async()=>{
        const vendors = await Vendor.find()
        const vendorId = vendors[0]._doc._id.toString()
  
        const req:any = {
          user:{
            _id: vendorId,
            email:'sam@sam.com' ,
            foodTypes: ['vegan'],
          },
          body:{
            name:'pizza', 
            foodType:'vegan', 
            price: 5, 
            description:'San Marzano tomato sauce, fresh mozzarella, grated parmesan and pepperoni from Il Mondo Vecchio', 
            readyTime:1, // one hour
            category:'vegan'
          },
          files:[{filename:'image1_path'}, {filename:'image2_path'}]
        }
        
        const res = {
          existingVendor: null,
          statusCode: 500,
          status(code:number){
            this.statusCode = code
            return this
          },
          json(existingVendor:any){
            this.existingVendor = existingVendor
          }
        } as ResponseWithJson

        const next = ()=>{}

        await vendorController.addFood(req, res, next)
    
        expect(res.statusCode).to.equal(201)
        expect(res.existingVendor.foods.length).to.equal(1)
        expect(res.existingVendor.foods[0].images).to.have.all.members(['image1_path', 'image2_path'])
      })

    })
    context('fetch foods', ()=>{
      it('it should fetch foods for a specific vendor', async()=>{
        const vendors = await Vendor.find()
        const vendorId = vendors[0]._doc._id.toString()
  
        const req:any = {
          user:{
            _id: vendorId,
            email:'sam@sam.com' ,
            foodTypes: ['vegan'],
          },
          body:{
            name:'pizza', 
            foodType:'vegan', 
            price: 5, 
            description:'San Marzano tomato sauce, fresh mozzarella, grated parmesan and pepperoni from Il Mondo Vecchio', 
            readyTime:1, // one hour
            category:'vegan'
          },
          files:[{filename:'image1_path'}, {filename:'image2_path'}]
        }
        
        const res = {
          foods: null,
          statusCode: 500,
          status(code:number){
            this.statusCode = code
            return this
          },
          json(foods:any){
            this.foods = [...foods]
          }
        } as ResponseWithJson
  
        const next = ()=>{}
        await vendorController.addFood(req, res, next)
        await vendorController.getFoods(req, res, next)
        expect(res.statusCode).to.equal(200)
        expect(res.foods.length ).to.equal(1)
  
      })
      it('it should throw an error if user is not found', async()=>{
        const req:any = {
          user:{
            _id: id,
            email:'sam@sam.com' ,
            foodTypes: ['vegan'],
          }
        }
        
        const res = {
          status(code:number){
            return this
          },
          json(existingVendor:any){}
        } as ResponseWithJson
  
        const next = ()=>{}
       
        const error = await vendorController.getFoods(req, res, next)
        expect(error.statusCode).to.equal(404)
        expect(error).to.have.property('message', 'Vendor not found')
        
      })

      it('it should return an unauthorized message if user is not logged in ', async ()=>{
        const req:any = {}
        const res = {
          status(code:number){
            return this
          },
          json(existingVendor:any){}
        } as ResponseWithJson
  
        const next = ()=>{}
       
        const error = await vendorController.getFoods(req, res, next)
        expect(error.statusCode).to.equal(401)
        expect(error).to.have.property('message', 'UnAuthorized')
      })
    })
    context('covert images', ()=>{
      it('it should add covert images to vendor' , async()=>{
        const vendors = await Vendor.find()
        const vendorId = vendors[0]._doc._id.toString()
  
        const req:any = {
          user:{
            _id: vendorId,
            email:'sam@sam.com' ,
            foodTypes: ['vegan'],
          },
          files:[{filename:'image1_path'}, {filename:'image2_path'}]
        }
        
        const res = {
          existingVendor: null,
          statusCode: 500,
          status(code:number){
            this.statusCode = code
            return this
          },
          json(existingVendor:any){
            this.existingVendor = existingVendor
          }
        } as ResponseWithJson
  
        const next = ()=>{}
       
        await vendorController.addCoverImages(req, res, next)
        expect(res.statusCode).to.equal(200)
        expect(res.existingVendor.coverImages ).to.have.all.members(['ada','image1_path', 'image2_path'])
  
      })
      it('it should throw an error if user is not found', async()=>{
        const req:any = {
          user:{
            _id: id,
            email:'sam@sam.com' ,
            foodTypes: ['vegan'],
          },
          files:[{filename:'image1_path'}, {filename:'image2_path'}]
        }
        
        const res = {
          status(code:number){
            return this
          },
          json(existingVendor:any){}
        } as ResponseWithJson
  
        const next = ()=>{}
       
        const error = await vendorController.addCoverImages(req, res, next)
        expect(error.statusCode).to.equal(404)
        expect(error).to.have.property('message', 'Vendor not found')
        
      })
      
      it('it should return an unauthorized message if user is not logged in ', async ()=>{
        const req:any = {}
        const res = {
          status(code:number){
            return this
          },
          json(existingVendor:any){}
        } as ResponseWithJson
  
        const next = ()=>{}
       
        const error = await vendorController.addCoverImages(req, res, next)
        expect(error.statusCode).to.equal(401)
        expect(error).to.have.property('message', 'UnAuthorized')
      })
    })
  })

})
import {Request, Response, NextFunction} from 'express'
import {expect} from 'chai'
import mongoose from 'mongoose'
import sinon from 'sinon'


import {Controllers} from '../src/controllers/adminController'
import {VendorBuilder} from '../src/utils/models/defaultVendors'
import {Vendor} from '../src/models'
import {MONGODB_TEST_URL} from '../src/config'

interface ResponseWithJson extends Response {
  json():this;
  vendors?: any;
  vendor?: any
}


describe('admin controller', ()=>{
  let controller : Controllers
  before(()=>{
    controller = new Controllers()
  })
  it('it should throw an error with 500 if accessing database fails',  ()=>{
    sinon.stub(Vendor, 'findOne')
    Vendor.findOne.throws()

    const vendor = new VendorBuilder().build()
    const res = {} as Response
    const next:NextFunction = ()=>{} 
    const req = {
      body: vendor
    }
    
    
     controller.createVendor(req as Request, res, next).then((result)=>{
      expect(result).not.to.throw()
      expect(result.statusCode).to.equal(401) 
     })
     Vendor.findOne.restore()
     
  
  })
  context('registration-fetching', ()=>{
    beforeEach( async()=>{
      try {
        await mongoose.connect(MONGODB_TEST_URL, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true
        })
      } catch (ex) {
        console.log('Exception: ' + ex)
      }
    })
    afterEach( async ()=>{
      await Vendor.deleteMany({})
      await mongoose.disconnect()
    })

    const id = '5c0f66b979af55031b34728a'
    
    it('it should fetch a vendor when id is provided ', async()=>{
      
      const vendor = new VendorBuilder()
        .withId(id)
        .withSalt('salt')
        .build()

      const res = {
        statusCode: 500,
        vendor: null,
        status(code:number){
          this.statusCode = code
          return this
        },
        json(data:any){
          this.vendor = data
        }
      } as ResponseWithJson
      const next:NextFunction = ()=>{}
      const req: any = {
        params: {vendorId:id}
      } 
      await Vendor.create(vendor)
     
      await controller.getVendorById(req, res , next)
      expect(res.vendor._doc._id.toString()).to.equal(id)
      expect(res.statusCode).to.equal(200)
    })

    it('it should fetch all existing vendors', async()=>{
      const id2 = '5c0f66b979af55031b34728b'
      const vendor1 = new VendorBuilder()
        .withId(id)
        .withSalt('salt')
        .build()
      const vendor2 = new VendorBuilder()
        .withId(id2)
        .withSalt('salt')
        .build()

      const res = {
        statusCode: 500,
        vendors: null,
        status(code:number){
          this.statusCode = code
          return this
        },
        json(data:any){
          this.vendors = data
          return this
        }
      } as ResponseWithJson
      const next:NextFunction = ()=>{}
      const req: any = {}

      await Vendor.create(vendor1)
      await Vendor.create(vendor2)
     
      await controller.getVendors(req, res, next)
      expect(res.statusCode).to.equal(200)
      expect(res.vendors.length).to.equal(2)
    })

    it('it should set status code to 500 if wrong id is provided.', async()=>{
      const wrongId = '5c0f66b979af55031b34728r' // we have changed a to r
      const vendor = new VendorBuilder().withId(id).withSalt('salt').build()
      const res= {
        status(code:number){
          return this
        },
        json(){}
      } as ResponseWithJson

      const next:NextFunction = ()=>{}
      const req:any = {
        params: {vendorId:wrongId}
      } 
      await Vendor.create(vendor)
      const error =  await controller.getVendorById(req, res, next)
      expect(error.statusCode).to.equal(500)  
    })
  })

 
})
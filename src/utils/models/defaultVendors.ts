import { json } from 'body-parser'
import {Vendor} from './index'
import {VendorData} from '../../dto'

// export class DefaultVendor extends Vendor {
//   constructor({
//     _id=1,
//     name= 'damiss',
//     ownerName= 'Damiss Sam',
//     foodTypes= ['vegan'],
//     pinCode=  '1010',
//     address= 'ul. Rostafinskiego 9, krakow ',
//     phone= '+48729608955',
//     email= 'sam@damiss.com',
//     password= '123456',
//     salt= 'xyzta',
//     serviceAvailable= false,
//     coverImages= ['ada'],
//     rating= 0,
//   }={}){
//     super({
//     name,
//     ownerName,
//     foodTypes,
//     pinCode,
//     address,
//     phone,
//     email,
//     password,
//     salt,
//     serviceAvailable,
//     coverImages, 
//     rating,
//     })
//   }
// }


export class VendorBuilder {
  public vendor: VendorData
  constructor () {
    this.vendor = {
      _id:'1',
      name: 'damiss',
      ownerName: 'Damiss Sam',
      foodTypes: ['vegan'],
      pinCode:  '1010',
      address: 'ul. Rostafinskiego 9, krakow ',
      phone: '+48729608955',
      email: 'sam@sam.com',
      password: 'abc12345',
      salt: '',
      serviceAvailable: false,
      coverImages: ['ada'],
      rating: 0,
    }
  }

  build () {
    const vendor = JSON.parse(JSON.stringify(this.vendor))
    return vendor
  }
  withId (id:string):VendorBuilder {
    this.vendor._id = id
    return this
  }
  withName (name:string):VendorBuilder {
    this.vendor.name = name
    return this
  }
  withOwnerName (ownerName:string):VendorBuilder {
    this.vendor.ownerName = ownerName
    return this
  }
  withFoodTypes (foodTypes:string[]):VendorBuilder {
    this.vendor.foodTypes = foodTypes
    return this
  }
  withPinCode (code:string):VendorBuilder {
    this.vendor.pinCode = code
    return this
  }
  withAddress (address:string):VendorBuilder {
    this.vendor.address = address
    return this
  }
  withPhone (phone:string):VendorBuilder {
    this.vendor.phone = phone
    return this
  }
  withEmail (email:string):VendorBuilder {
    this.vendor.email = email
    return this
  }
  withPassword (password:string):VendorBuilder {
    this.vendor.password = password
    return this
  }
  withSalt (salt:string):VendorBuilder {
    this.vendor.salt = salt
    return this
  }

  withServiceAvailable (serviceAvailable: boolean):VendorBuilder {
    this.vendor.serviceAvailable = serviceAvailable
    return this
  }
  withCoverImages (coverImages: string[]):VendorBuilder {
    this.vendor.coverImages = coverImages
    return this
  }
  withRating (rating: number):VendorBuilder {
    this.vendor.rating = rating
    return this
  }
}

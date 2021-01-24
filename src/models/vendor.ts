import mongoose, {Schema, Model, Document} from 'mongoose'
import {CreateVendorInput} from '../dto'

export interface VendorDoc extends CreateVendorInput , Document {
  salt: string;
  serviceAvailable: boolean;
  coverImages: string[];
  rating: number;
  foods: any
}

const vendorSchema = new Schema({
  name: {type: String, required: true},
  ownerName: {type: String, required: true},
  foodTypes: {type: [String]},
  pinCode:  {type: String, required: true},
  address: {type: String},
  phone: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  salt: {type: String, required: true},
  serviceAvailable: {type: Boolean},
  coverImages: {type: [String]},
  rating: {type: Number},
  foods: [{
    type:mongoose.SchemaTypes.ObjectId,
    ref: 'food'
  }]
}, {
  toJSON:{
    transform(doc, ret){
      delete ret.createdAt
      delete ret.updatedAt
      delete ret.__v
      delete ret.salt
      delete ret.password
    }
  },
  timestamps: true
})

const Vendor = mongoose.model<VendorDoc>('vendor', vendorSchema)

export {Vendor}
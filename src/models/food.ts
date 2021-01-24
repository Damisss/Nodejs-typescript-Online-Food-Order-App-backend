import mongoose, {Model, Schema, Document, Mongoose} from 'mongoose'
import {CreateFood} from '../dto'

interface FoodDoc extends Document, CreateFood {
  vendorId: string;
  images:string[];
  rating: number;
}

const foodSchema = new Schema({
  vendorId: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true},
  category: {type: String, required: true},
  foodType: {type: String, required: true},
  readyTime: {type: Number, required: true},
  price: {type: Number, required: true},
  rating: {type: String},
  images: {type: [String], required: true},
},
{
  toJSON: {
    transform(doc, ret){
      delete ret.createdAt
      delete ret.updatedAt
      delete ret.__v
    }
  },
  timestamps: true
})


const Food = mongoose.model<FoodDoc>('food', foodSchema)

export {Food}
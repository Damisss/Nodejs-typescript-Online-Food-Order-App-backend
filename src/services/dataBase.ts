import mongoose from 'mongoose'

import {mongooseUrl} from '../config'

export default class DataBase {
  public static async connect (){
    try {
      await mongoose.connect(mongooseUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      })
      console.log('mongoose is connected')
      
    } catch (ex) {
      console.log('Exception: ' + ex)
    }
  }
}


// export default async  ()=>{
//   try {
//     await mongoose.connect(mongooseUrl, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useUnifiedTopology: true
//     })
//     console.log('mongoose is connected')
    
//   } catch (ex) {
//     console.log('Exception: ' + ex)
//   }
// }
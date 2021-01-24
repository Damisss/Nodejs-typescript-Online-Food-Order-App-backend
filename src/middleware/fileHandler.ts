import multer from 'multer'
import {Request, Response, NextFunction, Handler} from 'express'


const imageHandler =  ()=>{
  try {
    const imageStorage = multer.diskStorage({
      destination: (req, file, cb)=>{
        cb(null, 'images')
      },
      filename: (req, file, cb)=>{
        cb(null, new Date().toISOString() + file.originalname)
    
      }
    })
    const images = multer({storage: imageStorage}).array('images', 10)
    return images
    
  } catch (ex) {
    console.log('Exception: ', ex)
  }
}


export const images = imageHandler() as Handler
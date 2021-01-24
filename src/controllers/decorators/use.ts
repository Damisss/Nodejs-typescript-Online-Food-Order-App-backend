import 'reflect-metadata'
import {Handler} from 'express'

export const useMiddleware =  (middleware:Handler): Function=>{
  return (target:any, key:string, desc: PropertyDescriptor): void=>{
    const middlewares = Reflect.getMetadata('middleware', target, key) || []
    Reflect.defineMetadata('middleware', [...middlewares, middleware], target, key)

  }

}
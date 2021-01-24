import 'reflect-metadata'
// enum data type that contains different http request methods.
import {Methods} from './methods'

const bindContoller =  (method: string): Function =>{
  return (path: string): Function =>{
    // our decorator function
    return (target: any, key: string, desc: PropertyDescriptor): void =>{
      //add url path to a special object.
      Reflect.defineMetadata('path', path, target, key)
      //add http request method to a special object. 
      Reflect.defineMetadata('method', method, target, key)
    }
  }
}

// http request methods that can be used now as decorators.
export const get = bindContoller(Methods.get)
export const post = bindContoller(Methods.post)
export const patch = bindContoller(Methods.patch)
export const del = bindContoller(Methods.del)
export const put = bindContoller(Methods.put)
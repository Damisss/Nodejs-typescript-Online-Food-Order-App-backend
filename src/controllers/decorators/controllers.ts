import 'reflect-metadata'
import {appRouter} from '../../appRouter'
import {Methods} from './methods'



export const controller = (prefix: string): Function =>{
  return (target:Function, key:string, desc: PropertyDescriptor):void =>{
    
    const router = appRouter()
    for(let key in target.prototype){
      const handler = target.prototype[key]
      const path = Reflect.getMetadata('path', target.prototype, key)
      
      const method:Methods = Reflect.getMetadata('method', target.prototype, key)
      const middlewares = Reflect.getMetadata('middleware', target.prototype, key) || []
      
  
      if (path) {
        router[method](`${prefix}${path}`, ...middlewares, handler)
      }
    }

  }
}
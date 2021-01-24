import express, {Application, Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser'
import path from 'path'
import {appRouter} from '../appRouter'
//import {router} from './router'




export default class App{
  public static async start(app: Application): Promise<Application> {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    app.use('/images', express.static(path.join(__dirname, 'images')))
    app.use(appRouter())
    

    app.use((req: Request, res: Response, next: NextFunction): void =>{
      res.send('<h1>Page Not Found</h1>')
      //status(404).render('<h1>Page Not Found</h1>')
    })
    return app
  }
}
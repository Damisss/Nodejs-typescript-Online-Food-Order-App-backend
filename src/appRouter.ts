` 
This class allow us to have a single router accross our app.
`

import {Router} from 'express'

class AppRouter {
  private static routeInstance: Router

  get getRouteInstance(): Router {
    if (!AppRouter.routeInstance){
      AppRouter.routeInstance = Router()
    }
    return AppRouter.routeInstance
  }
}

export function appRouter (){
  const router = new AppRouter()
  return router.getRouteInstance
}


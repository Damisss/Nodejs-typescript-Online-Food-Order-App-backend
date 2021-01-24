import express from 'express'
import App from './services/expresssApp'
import dbConnection from './services/dataBase'

import './controllers/adminController'
import './controllers/vendorController'


 (async ()=>{
  const app = express()
  await App.start(app)
  await dbConnection.connect()
  app.listen(3000, ()=>{
    console.log('Listening at port 3000')
  })

})()
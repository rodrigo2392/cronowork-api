import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


import { UserRoutes } from './routes/user.routes';
import { CommonRoutes } from './routes/common.routes';


const app = express()
const port = process.env.PORT
const routes: Array<CommonRoutes> = [];

routes.push(new UserRoutes(app));

app.get('/', (req, res) => {
  res.json({version: process.env.VERSION})
})
app.post('/', (req, res) => {
    res.json({message: "esta es una ruta post"})
})
app.listen(port, () => {
  routes.map(el => {
    console.log(`Route ${el.getName()}`)
  })
  console.log(`Server on port: ${port}`)
})
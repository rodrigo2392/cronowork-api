import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import * as bodyparser from 'body-parser';
dotenv.config();
import { UserRoutes } from './routes/user.routes';
import { CommonRoutes } from './routes/common.routes';
const app = express()

app.use(cors())
app.use(bodyparser.json())

const port = process.env.PORT
const routes: Array<CommonRoutes> = [];

routes.push(new UserRoutes(app));

app.get('/', (req, res) => {
  res.json({message: "API CRONOWORK"})
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
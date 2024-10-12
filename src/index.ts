import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.json({version: process.env.VERSION})
})
app.post('/', (req, res) => {
    res.json({message: "esta es una ruta post"})
})
app.listen(port, () => {
  console.log(`Server on port: ${port}`)
})
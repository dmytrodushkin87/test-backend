import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import models from './models'
import routes from './routes'

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

// CORS options
const corsOptions = {
  credentials: true,
  origin: true,
}

// cors
app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.context = {
    models,
  }
  next()
})


app.use(routes)

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'URL NOT FOUND',
  })
})

models.sequelize.sync({}).then(() => {
  // Listen on server with port
  app.listen(port, () => {
    console.log(`Server listen port : ${port}`)
  })
})

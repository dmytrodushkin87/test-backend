import express from 'express'

import {
  buyProduct,
} from '../../controller/product'


const route = express.Router()
route.use(express.json())

route.get('/', (req, res) => {
  res.send('Welcome to Express')
})

route.post('/buyProduct', buyProduct)

export default route

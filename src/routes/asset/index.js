import express from 'express'

import {
  createAsset,
} from '../../controller/asset'


const route = express.Router()
route.use(express.json())

route.get('/', (req, res) => {
  res.send('Welcome to Express')
})

route.post('/create-asset', createAsset)

export default route

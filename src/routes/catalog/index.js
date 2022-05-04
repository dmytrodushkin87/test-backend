import express from 'express'

import {
  createCatalog,
  updateCatalog,
  getCatalog,
  getCatalogs,
  deleteCatalog,
} from '../../controller/catalog'


const route = express.Router()
route.use(express.json())

route.get('/', (req, res) => {
  res.send('Welcome to Express')
})

route.post('/create-catalog', createCatalog)
route.get('/all-catalogs', getCatalogs)
route.get('/:id', getCatalog)
route.patch('/:id', updateCatalog)
route.delete('/:id', deleteCatalog)

export default route

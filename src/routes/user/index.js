import express from 'express'

import {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
} from '../../controller/user'

import { userValidation } from '../../middleware/middleware'

const route = express.Router()
route.use(express.json())

route.get('/', (req, res) => {
  res.send('Welcome to Express')
})

route.post('/create-user', userValidation, createUser)
route.get('/all-users', getUsers)
route.get('/:address', getUser)
route.patch('/:address', updateUser)
route.delete('/:address', deleteUser)

export default route

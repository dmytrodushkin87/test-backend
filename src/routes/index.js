import express from 'express'

import userRoutes from './user'
import catalogRoutes from './catalog'
import productRoutes from './product'
import assetRoutes from './asset'

const router = express.Router()

// GET /health-check - Check service health
router.get('/health-check', (req, res) => res.send('OK'))

// User Routes
router.use('/user', userRoutes)
router.use('/catalog', catalogRoutes)
router.use('/product', productRoutes)
router.use('/asset', assetRoutes)

export default router

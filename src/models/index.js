import Sequelize from 'sequelize'
import dotenv from 'dotenv'

import User from './User'
import Catalog from './Catalog'
import Asset from './Asset'
import Product from './Product'

dotenv.config()


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT,
  underscored: true,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    freezeTableName: true,
  },
})

const models = {
  User: User.init(sequelize, Sequelize),
  Catalog: Catalog.init(sequelize, Sequelize),
  Asset: Asset.init(sequelize, Sequelize),
  Product: Product.init(sequelize, Sequelize),
}

try {
  sequelize.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.log('Unable to connect to the database:', error)
}

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

export default models

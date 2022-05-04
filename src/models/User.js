import { Model, DataTypes } from 'sequelize'

export default class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        address: {
          type: DataTypes.STRING,
          primaryKey: true
        },
        cash1: {
          type: DataTypes.FLOAT,
        },
        cash2: {
          type: DataTypes.FLOAT,
        },
        cash3: {
          type: DataTypes.FLOAT,
        },
      },
      {
        sequelize,
        underscored: true,
      },
    )
  }

  // associate
  static associate(models) {
  }
}

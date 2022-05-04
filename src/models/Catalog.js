import { Model, DataTypes } from 'sequelize'

export default class Catalog extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.STRING,
        },
        url: {
          type: DataTypes.STRING,
        },
        cost1: {
          type: DataTypes.INTEGER,
        },
        cost2: {
          type: DataTypes.INTEGER,
        },
        cost3: {
          type: DataTypes.INTEGER,
        },
        req1: {
          type: DataTypes.INTEGER,
        },
        req2: {
          type: DataTypes.INTEGER,
        },
        req3: {
          type: DataTypes.INTEGER,
        },
        category: {
          type: DataTypes.INTEGER,
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

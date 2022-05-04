import { Model, DataTypes } from 'sequelize'

export default class Product extends Model {
  static init(sequelize) {
    return super.init(
      {
        addressKey: {
          type: DataTypes.STRING,
        }
      },
      {
        sequelize,
        underscored: true,
      },
    )
  }

  // associate
  static associate(models) {
    this.addressKey = this.belongsTo(models.User, {
      foreignKey: 'addressKey',
      targetKey: 'address',
      as: 'address',
    })
  }
}

import { Model } from 'sequelize'

export default class Asset extends Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: DataTypes.INTEGER,
        },
        level: {
          type: DataTypes.FLOAT,
        },
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

const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class ItemState extends Model {}
ItemState.init({
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'itemState'
})

ItemState.sync()

module.exports = ItemState


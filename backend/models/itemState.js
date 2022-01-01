const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class ItemState extends Model {}
ItemState.init({
  stateDescription: {
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


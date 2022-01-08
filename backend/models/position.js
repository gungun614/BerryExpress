const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Position extends Model {}
Position.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'position'
})

Position.sync()

module.exports = Position



const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Branch extends Model {}
Branch.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateStart: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'branch'
})

Branch.sync()

module.exports = Branch 
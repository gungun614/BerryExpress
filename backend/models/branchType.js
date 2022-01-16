const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class BranchType extends Model {}
BranchType.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'branchType'
})

BranchType.sync()

module.exports = BranchType
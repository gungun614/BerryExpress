const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Staff extends Model {}
Staff.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  positionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  salary: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  branchId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dateStarted: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  citizenId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subdistrict: {
    type: DataTypes.STRING,
    allowNull: false
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false
  },
  province: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zipcode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'staff'
})

Staff.sync()

module.exports = Staff
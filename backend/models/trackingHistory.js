const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class TrackingHistory extends Model {}
TrackingHistory.init({
  trackingNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stateId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  staffId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dateReceived: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'trackingHistory'
})

TrackingHistory.sync()

module.exports = TrackingHistory
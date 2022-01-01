const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Item extends Model {}

Item.init({
    tracking_no:        { type: DataTypes.STRING, allowNull: false },
    sender_name:        { type: DataTypes.STRING, allowNull: false },
    sender_tel:         { type: DataTypes.STRING, allowNull: false },
    sender_idcard:      { type: DataTypes.STRING, allowNull: false },
    sender_address:     { type: DataTypes.STRING, allowNull: false },
    receiver_name:      { type: DataTypes.STRING, allowNull: false },
    receiver_tel:       { type: DataTypes.STRING, allowNull: false },
    receiver_address:   { type: DataTypes.STRING, allowNull: false }
},
{
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'item'
})
Item.sync()

module.exports = Item
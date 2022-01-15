const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Item extends Model {}

Item.init({
    senderFirstname: { type: DataTypes.STRING, allowNull: false },
    senderLastname: { type: DataTypes.STRING, allowNull: false },
    senderTel: { type: DataTypes.STRING, allowNull: false },
    senderCitizenId: { type: DataTypes.STRING, allowNull: false },
    // senderAddress: { type: DataTypes.STRING, allowNull: false },
    // senderSubdistrict: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    // senderDistrict: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    // senderProvince: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    // senderZipcode: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    receiverFirstname:      { type: DataTypes.STRING, allowNull: false },
    receiverLastname:      { type: DataTypes.STRING, allowNull: false },
    receiverTel:       { type: DataTypes.STRING, allowNull: false },
    receiverAddress:   { type: DataTypes.STRING, allowNull: false },
    receiverSubdistrict: {
        type: DataTypes.STRING,
        allowNull: false
    },
    receiverDistrict: {
        type: DataTypes.STRING,
        allowNull: false
    },
    receiverProvince: {
        type: DataTypes.STRING,
        allowNull: false
    },
    receiverZipcode: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'item'
})
Item.sync()

module.exports = Item
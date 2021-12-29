const { DATABASE_URL } = require('./config')

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('postgres db connected')
  } catch (error) {
    console.error('Unable to connect to postgres db')
  }
}

module.exports = { sequelize, connectToDatabase }
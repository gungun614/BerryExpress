const express = require('express')

const app = express()

const controller = require('./controllers')

const { connectToDatabase } = require('./utils/db')

connectToDatabase()
app.use(express.json())

app.use('/api/positions', controller.positions)

module.exports = app
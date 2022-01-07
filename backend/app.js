const express = require('express')

const app = express()

const controller = require('./controllers')

const { connectToDatabase } = require('./utils/db')

connectToDatabase()
app.use(express.json())

app.use('/api/positions', controller.positions)
app.use('/api/items', controller.items)
app.use('/api/trackingHistories', controller.trackingHistories)
app.use('/api/staffs', controller.trackingHistories)
app.use('/api/itemStates', controller.itemStates)
app.use('/api/branches', controller.branches)


module.exports = app
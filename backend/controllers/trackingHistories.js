const router = require('express').Router()
const { Op } = require("sequelize");
const { TestWatcher } = require('jest')
const { getDateTime } = require('../utils/helper')
const { TrackingHistory , Branch } = require('../models')

const trackingHistoryFinder = async (req, res, next) => {
  req.trackingHistory = await TrackingHistory.findByPk(req.params.id)
  next()
}

// GET
// select *
router.get('/', async (req, res) => {
  const trackingHistories = await TrackingHistory.findAll()
  res.json(trackingHistories)
  console.log(trackingHistories)
})

// select * from _ where tracking_no = ...
// TO DO:

// Find TrackingNumber
router.get('/find/:trackingNumber', async (req, res) => {
  const branchDatas = await Branch.findAll({ attributes : ['name'] })
  let trackings = await TrackingHistory.findAll({
    where : {
      trackingNo : {
        [Op.like] : req.params.trackingNumber
      }
    }
  })

  trackings.forEach((tracking) => {
    tracking.dataValues.branchName = branchDatas[tracking.branchId-1].name
    tracking.dataValues.date = getDateTime('date' , tracking.dataValues.dateReceived )
    tracking.dataValues.time = getDateTime('time' , tracking.dataValues.dateReceived )
  })

  if (trackings) {
    res.json(trackings)
  } else {
    res.status(404).end()
  }
})


// POST
router.post('/', async (req, res) => {
  try {
    const trackingHistory = await TrackingHistory.create(req.body)
    res.json(trackingHistory)
    console.log(trackingHistory)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

// PUT
router.put('/:id', trackingHistoryFinder, async (req, res) => {
  if (req.trackingHistory) {
    req.trackingHistory.trackingNo = req.body.trackingNo
    req.trackingHistory.stateId = req.body.stateId
    req.trackingHistory.staffId = req.body.staffId
    req.trackingHistory.dateReceived = req.body.dateReceived
    await req.trackingHistory.save()
    res.json(req.trackingHistory)
    console.log(req.trackingHistory)
  } else {
    res.status(404).end()
  }
})

// DELETE
router.delete('/:id', trackingHistoryFinder, async (req, res) => {
  if (req.trackingHistory) {
    await req.trackingHistory.destroy()
  }
  res.status(204).end()
})

module.exports = router
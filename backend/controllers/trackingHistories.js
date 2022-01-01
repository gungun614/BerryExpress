const router = require('express').Router()

const { TrackingHistory } = require('../models')

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

// select _ from position where id = ...
router.get('/:id', trackingHistoryFinder, async (req, res) => {
  if (req.trackingHistory) {
    res.json(req.trackingHistory)
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
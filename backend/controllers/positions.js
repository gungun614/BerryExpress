const router = require('express').Router()

const { Position } = require('../models')

const positionFinder = async (req, res, next) => {
  req.position = await Position.findByPk(req.params.id)
  next()
}

// GET
// select * from position
router.get('/', async (req, res) => {
  const positions = await Position.findAll()
  res.json(positions)
  console.log(positions)
})

// select _ from position where id = ...
router.get('/:id', positionFinder, async (req, res) => {
  if (req.position) {
    res.json(req.position)
  } else {
    res.status(404).end()
  }
})

// POST
// GET localhost/api/positon/:id
// POST localhost/api/position
// {
//   'name': "admin"
// }
router.post('/', async (req, res) => {
  try {
    const position = await Position.create(req.body)
    res.json(position)
    console.log(position)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

// PUT
// PUT locolhost/api/positions/:id
// {
//  'name': "admin-staff"
// }
router.put('/:id', positionFinder, async (req, res) => {
  if (req.position) {
    req.position = await helper.genUpdate(req.position, req.body)
    await req.position.save()
    res.json(req.position)
    console.log(req.position)
  } else {
    res.status(404).end()
  }
})

// DELETE
router.delete('/:id', positionFinder, async (req, res) => {
  if (req.position) {
    await req.position.destroy()
  }
  res.status(204).end()
})

module.exports = router



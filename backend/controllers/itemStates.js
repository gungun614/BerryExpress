const router = require('express').Router()

const { ItemState } = require('../models')

const itemStateFinder = async (req, res, next) => {
  req.itemState = await ItemState.findByPk(req.params.id)
  next()
}

// GET
// select * from itemState
router.get('/', async (req, res) => {
  const itemStates = await ItemState.findAll()
  res.json(itemStates)
  console.log(itemStates)
})

// select _ from itemState where id = ...
router.get('/:id', itemStateFinder, async (req, res) => {
  if (req.itemState) {
    res.json(req.itemState)
  } else {
    res.status(404).end()
  }
})

// POST
// GET localhost/api/positon/:id
// POST localhost/api/itemState
// {
//   'name': "admin"
// }
router.post('/', async (req, res) => {
  try {
    const itemState = await ItenState.create(req.body)
    res.json(itemState)
    console.log(itemState)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

// PUT
// PUT locolhost/api/itemStates/:id
// {
//  'name': "admin-staff"
// }
router.put('/:id', itemStateFinder, async (req, res) => {
  if (req.itemState) {
    req.itemState.stateDescription = req.body.stateDescription
    await req.itemState.save()
    res.json(req.itemState)
    console.log(req.itemState)
  } else {
    res.status(404).end()
  }
})

// DELETE
router.delete('/:id', itemStateFinder, async (req, res) => {
  if (req.itemState) {
    await req.itemState.destroy()
  }
  res.status(204).end()
})

module.exports = router



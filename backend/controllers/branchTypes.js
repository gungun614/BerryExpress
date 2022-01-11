const router = require('express').Router()
const { BranchType } = require('../models')
const helper = require('../utils/helper')

const branchTypeFinder = async (req, res, next) => {
  req.branchType = await BranchType.findByPk(req.params.id)
  next()
}

// GET
router.get('/', async (req, res) => {
  const branchTypes = await BranchType.findAll()
  res.json(branchTypes)
  console.log(branchTypes)
})

router.get('/:id', branchTypeFinder, async (req, res) => {
  if (req.branchType) {
    res.json(req.branchType)
  } else {
    res.status(404).end()
  }
})

// POST
router.post('/', async (req, res) => {
  try {
    const branchType = await BranchType.create(req.body)
    res.json(branchType)
    console.log(branchType)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

// PUT
router.put('/:id', branchTypeFinder, async (req, res) => {
  if (req.branchType) {
    req.branchType = await helper.genUpdate(req.branchType, req.body)
    await req.branchType.save()
    res.json(req.branchType)
    console.log(req.branchType)
  } else {
    res.status(404).end()
  }
})

// DELETE
router.delete('/:id', branchTypeFinder, async (req, res) => {
  if (req.branchType) {
    await req.branchType.destroy()
  }
  res.status(204).end()
})

module.exports = router
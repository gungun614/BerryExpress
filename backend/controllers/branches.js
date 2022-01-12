const router = require('express').Router()
const { Branch } = require('../models')
const helper = require('../utils/helper')

const branchFinder = async (req, res, next) => {
  req.branch = await Branch.findByPk(req.params.id)
  next()
}

// GET
router.get('/', async (req, res) => {
  const branches = await Branch.findAll()
  res.json(branches)
})

router.get('/maxId', async (req, res) => {
  const maxId = await Branch.max('id')
  if (maxId) {
    res.json({ 'maxId': maxId })
  } else {
    res.json({ 'maxId': 0 })
  }
})

// GET COUNT(branch_type_id)
router.get('/count/:id', async (req, res) => {
  const amount = await Branch.count({
    where: {
      branchTypeId: req.params.id
    }
  })
  if (amount) {
    res.json({ 'amount': amount })
  } else {
    res.json({ 'amount': 0})
  }
})

// GET COUNT(branch_type_id, subdistrict)
router.get('/count/:id/:subdistrict', async (req, res) => {
  const amount = await Branch.count({
    where: {
      branchTypeId: req.params.id,
      subdistrict: req.params.subdistrict
    }
  })
  if (amount) {
    res.json({ 'amount': amount })
  } else {
    res.json({ 'amount': 0})
  }
})

router.get('/:id', branchFinder, async (req, res) => {
  if (req.branch) {
    res.json(req.branch)
  } else {
    res.status(404).end()
  }
})


// POST
router.post('/', async (req, res) => {
  try {
    const branch = await Branch.create(req.body)
    res.json(branch)
    console.log(branch)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

// PUT
router.put('/:id', branchFinder, async (req, res) => {
  if (req.branch) {
    req.branch = await helper.genUpdate(req.branch, req.body)
    await req.branch.save()
    res.json(req.branch)
    console.log(req.branch)
  } else {
    res.status(404).end()
  }
})

// DELETE
router.delete('/:id', branchFinder, async (req, res) => {
  if (req.branch) {
    await req.branch.destroy()
  }
  res.status(204).end()
})

module.exports = router
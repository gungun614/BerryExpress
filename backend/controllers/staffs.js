const router = require('express').Router()
const { Staff } = require('../models')
const helper = require('../utils/helper')

const staffFinder = async (req, res, next) => {
  req.staff = await Staff.findByPk(req.params.id)
  next()
}

// GET
// select * from staff
// router.get('/', async (req, res) => {
//   const staff = await Staff.findAll()
//   res.json(staff)
//   console.log(staff)
// })

// get max id
router.get('/maxId', async (req, res) => {
  const maxId = await Staff.max('id')
  if (maxId) {
    res.json({ 'maxId': maxId })
  } else {
    res.json({ 'maxId': 0 })
  }
})

// select _ from staff where id = ...
router.get('/:id', staffFinder, async (req, res) => {
  if (req.staff) {
    res.json(req.staff)
  } else {
    res.status(404).end()
  }
})

// POST
// GET localhost/api/positon/:id
// POST localhost/api/staff
// {
//   'name': "admin"
// }
router.post('/', async (req, res) => {
  try {
    const staff = await Staff.create(req.body)

    console.log(staff)
    res.json(staff)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

// PUT
// PUT locolhost/api/staff/:id
// {
//  'name': "admin-staff"
// }
router.put('/:id', staffFinder, async (req, res) => {
  if (req.staff) {
    // req.staff.username = req.body.username
    // req.staff.password = req.body.password
    // req.staff.positionId = req.body.positionId
    // req.staff.salary = req.body.salary
    // req.staff.shopId = req.body.shopId
    // req.staff.dateStart = req.body.dateStart
    // req.staff.firstname = req.body.firstname
    // req.staff.lastname = req.body.lastname
    // req.staff.nationId = req.body.nationId
    // req.staff.dateBirth = req.body.dateBirth
    // req.staff.address = req.body.address
    // req.staff.tel = req.body.tel
    // req.staff.email = req.body.email
    req.staff = await helper.genUpdate(req.staff, req.body)
    await req.staff.save()
    res.json(req.staff)
    console.log(req.staff)
  } else {
    res.status(404).end()
  }
})

// DELETE
router.delete('/:id', staffFinder, async (req, res) => {
  if (req.staff) {
    await req.staff.destroy()
  }
  res.status(204).end()
})

module.exports = router
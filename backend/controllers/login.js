const router = require('express').Router()
const { Staff } = require('../models')

router.post('/', async (req, res) => {
  const body = req.body
  const user = await Staff.findOne({ where: { username: body.username }})
  const passwordCorrect = user !== null
    ? user.password === body.password
    : false

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  res.status(200).send(user)
})

module.exports = router
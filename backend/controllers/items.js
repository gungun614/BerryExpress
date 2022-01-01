const router = require('express').Router()
const { Item } = require('../models')
const helper = require('../utils/helper')

router.get('/', async (req, res) => {
    try {
        const item = await Item.findAll()
        res.json(item)
    } catch (err) {
        console.log(err)
        res.status(400).end()
    }
})

router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id)
        res.json(item)
    } catch (err) {
        console.log(err)
        res.status(400).end()
    }
})

router.post('/', async (req, res) => {
    try {
        const item = await Item.create(req.body)
        res.json(item)
    } catch (err) {
        console.log(err)
        res.status(400).end()
    }
})

router.put('/:id', async (req, res) => {
    try {
        let item = await Item.findByPk(req.params.id)
        if (item) {
            item = await helper.genUpdate(item, req.body)
            await item.save()
            res.json(item)
        } else {
            res.status(400).end()
        }
    } catch (err) {
        console.log(err)
        res.status(400).end()
    }
})

module.exports = router
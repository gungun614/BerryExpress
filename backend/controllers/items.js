const router = require('express').Router()
const { Item, Staff, TrackingHistory } = require('../models')
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

        const generateTrackingNo = async () => {
            let [ month, date, year ] = new Date().toLocaleDateString().split('/')
            if (date.length == 1) date = '0' + date
            if (month.length == 1) month = '0' + month
            year = year.substring(2, year.length)

            const maxTrackingNo = await Item.max('trackingNo').then(result => result)
            let nextTrackingNo = maxTrackingNo.substring(8, maxTrackingNo.length)
            nextTrackingNo = Number(nextTrackingNo) + 1
            nextTrackingNo = nextTrackingNo.toString()
            while (nextTrackingNo.length < 6) nextTrackingNo = '0' + nextTrackingNo

            return `BE${date}${month}${year}${nextTrackingNo}`
        }

        const parcels = req.body.parcels
        const sender = req.body.sender
        const staff = await Staff.findByPk(req.body.staffId).then(result => result.dataValues)

        const datetime = new Date().toLocaleString()
        let [ month, date, year ] = new Date().toLocaleDateString().split('/')
        if (date.length == 1) date = '0' + date
        if (month.length == 1) month = '0' + month
        year = year.substring(2, year.length)

        const maxTrackingId = await TrackingHistory.max('id')
        const maxTracking = await TrackingHistory.findByPk(maxTrackingId).then(result => result.dataValues)

        let isFirst = ''
        if (datetime > maxTracking.dateReceived) {
            isFirst = `BE${date}${month}${year}000001`
        } else {
            isFirst = false
        }
        
        for (const parcel of parcels) {

            let trackingNo = ''
            if (isFirst != false) {
                trackingNo = isFirst
                isFirst = false
            } else {
                trackingNo = await generateTrackingNo()
            }
        
            const tracking = {
                trackingNo: trackingNo,
                itemStateId: 1,
                staffId: staff.id,
                dateReceived: datetime,
                remark: null
            }

            const { homeNo, villageNo, alley, road } = parcel
            const address = `บ้านเลขที่ ${homeNo} หมู่ที่ ${villageNo} ซอย ${alley} ถนน ${road}`
            const item = {
                senderFirstname: sender.firstname,
                senderLastname: sender.lastname,
                senderTel: sender.tel,
                senderCitizenId: sender.nationId,
                trackingNo: trackingNo,
                receiverFirstname: parcel.firstname,
                receiverLastname: parcel.lastname,
                receiverTel: parcel.tel,
                receiverAddress: address,
                receiverSubdistrict: parcel.subdistrict,
                receiverDistrict: parcel.district,
                receiverProvince: parcel.province,
                receiverZipcode: parcel.zipcode 
            }

            await Item.create(item)
            await TrackingHistory.create(tracking)
        }

        res.status(200).json({ status: 'ok' })

    } catch (err) {
        console.log('error => ', err)
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
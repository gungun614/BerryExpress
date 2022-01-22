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

        const getDateCode = async () => {
            let [ month, date, year ] = new Date().toLocaleDateString().split('/')
            if (date.length == 1) date = '0' + date
            if (month.length == 1) month = '0' + month
            year = year.substring(2, year.length)
            return `${date}${month}${year}`
        }

        const getTrackingNo = async (maxTrackingNo) => {
            const dateCode = await getDateCode()
            const dateMaxTrackingNo = maxTrackingNo.substring(2, 8)
            if (dateCode == dateMaxTrackingNo) {
                const no = maxTrackingNo.substring(8, maxTrackingNo.length)
                let nextNo = Number(no) + 1
                nextNo = nextNo.toString()
                while (nextNo.length < 6) nextNo = '0' + nextNo
                return `BE${dateCode}${nextNo}`
            } else {
                return `BE${dateCode}000001`
            }
        }

        const parcels = req.body.parcels
        const sender = req.body.sender
        const staff = await Staff.findByPk(req.body.staffId).then(result => result.dataValues)

        const datetime = new Date().toLocaleString()

        for (const parcel of parcels) {
            const maxIdItem = await Item.max('id').then(result => result)
            const maxTrackingNo = await Item.findByPk(maxIdItem).then(result => result.dataValues.trackingNo)
            const trackingNo = await getTrackingNo(maxTrackingNo)
            
            const tracking = {
                trackingNo: trackingNo,
                itemStateId: 1,
                staffId: staff.id,
                branchId: staff.branchId,
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
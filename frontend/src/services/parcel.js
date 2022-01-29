import axios from 'axios'

const { SERVER_URL } = require('../utils/config')

const url = `${SERVER_URL}/api/items`

const saveParcels = async (data) => {
    return axios.post(url, data).then(result => result.data).catch(err => err)
}

const parcelService = {
    saveParcels
}

export default parcelService
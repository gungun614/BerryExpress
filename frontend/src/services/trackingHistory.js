
import axios from 'axios'
const { SERVER_URL } = require('../utils/config')

const baseUrl = `${SERVER_URL}/api/trackingHistories`

const findByTrackingNumber = async (TrackingNumber) => {
  const response = await axios.get(`${baseUrl}/find/${TrackingNumber}`)
  return response.data
}

const trackingHistoryService = {
    findByTrackingNumber 
}

export default trackingHistoryService
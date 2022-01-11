import axios from 'axios'
const { SERVER_URL } = require('../utils/config')

const baseUrl = `${SERVER_URL}/api/positions`

const findById = async (positionId) => {
  const response = await axios.get(`${baseUrl}/${positionId}`)
  return response.data
}
const findAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const positionService = {
  findById,
  findAll
}

export default positionService 
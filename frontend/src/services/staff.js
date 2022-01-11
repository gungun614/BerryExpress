import axios from 'axios'
const { SERVER_URL } = require('../utils/config')

const baseUrl = `${SERVER_URL}/api/staffs`

const findById = async (positionId) => {
  const response = await axios.get(`${baseUrl}/${positionId}`)
  return response.data
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const getLastId = async () => {
  const response = await axios.get(`${baseUrl}/maxId`)
  return response.data
}

const staffService = {
  findById,
  getAll,
  getLastId
}

export default staffService
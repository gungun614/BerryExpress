import axios from 'axios'
const { SERVER_URL } = require('../utils/config')

const baseUrl = `${SERVER_URL}/api/staffs`

const findById = async (positionId) => {
  const response = await axios.get(`${baseUrl}/${positionId}`)
  return response.data
}
const findAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const findLastId = async () => {
  const response = await axios.get(`${baseUrl}/maxId`)
  return response.data
}

const findBranchWithPositionCount = async (branchId, positionId) => {
  const response = await axios.get(`${baseUrl}/count/${branchId}/${positionId}`)
  return response.data
}

const add = async (staff) => {
  const response = await axios.post(baseUrl, staff)
  return response.data
}

const change = async (staff) => {
  const response = await axios.put(`${baseUrl}/${staff.id}`, staff)
  return response.data
}

const staffService = {
  findById,
  findAll,
  findLastId,
  findBranchWithPositionCount,
  add,
  change
}

export default staffService
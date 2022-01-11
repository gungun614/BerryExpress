import axios from 'axios'
const { SERVER_URL } = require('../utils/config')

const baseUrl = `${SERVER_URL}/api/branches`

const findLastId = async () => {
  const response = await axios.get(`${baseUrl}/maxId`)
  return response.data
}

const findBranchTypeCount = async (branchTypeId) => {
  const response = await axios.get(`${baseUrl}/count/${branchTypeId}`)
  return response.data
}

const branchService = {
  findLastId,
  findBranchTypeCount
}

export default branchService
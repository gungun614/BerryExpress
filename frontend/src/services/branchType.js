import axios from 'axios'
const { SERVER_URL } = require('../utils/config')

const baseUrl = `${SERVER_URL}/api/branchTypes`

const findAll = async () => {
  const response = await axios.get(`${baseUrl}`)
  return response.data
}

const findById = async (branchTypeId) => {
  const response = await axios.get(`${baseUrl}/${branchTypeId}`)
  return response.data
}

const branchTypeService = {
  findAll,
  findById
}

export default branchTypeService 
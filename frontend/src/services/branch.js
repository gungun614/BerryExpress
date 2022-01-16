import axios from 'axios'
const { SERVER_URL } = require('../utils/config')

const baseUrl = `${SERVER_URL}/api/branches`

const findLastId = async () => {
  const response = await axios.get(`${baseUrl}/maxId`)
  return response.data
}

const findAll = async () => {
  const response = await axios.get(`${baseUrl}`)
  return response.data
}

const findBranchTypeCount = async (branchTypeId) => {
  const response = await axios.get(`${baseUrl}/count/${branchTypeId}`)
  return response.data
}

const findBranchTypeWithSubdistrictCount = async (branchTypeId, subdistrict) => {
  const response = await axios.get(`${baseUrl}/count/${branchTypeId}/${subdistrict}`)
  return response.data
}

const add = async (branch) => {
  const response = await axios.post(baseUrl, branch)
  return response.data
}

const findByName = async (name) => {
  const response = await axios.get(`${baseUrl}/name/${name}`)
  return response.data
}

const findById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const branchService = {
  findLastId,
  findBranchTypeCount,
  add,
  findAll,
  findBranchTypeWithSubdistrictCount,
  findByName,
  findById
}

export default branchService
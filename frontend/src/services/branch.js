import axios from 'axios'
const { SERVER_URL } = require('../utils/config')

const baseUrl = `${SERVER_URL}/api/branches`

const getLastId = async () => {
  const response = await axios.get(`${baseUrl}/maxId`)
  return response.data
}

const branchService = {
  getLastId
}

export default branchService
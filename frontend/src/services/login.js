import axios from 'axios'
const { SERVER_URL } = require('../utils/config')

const baseUrl = `${SERVER_URL}/api/login`

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}
const loginService = {
  login
}

export default loginService
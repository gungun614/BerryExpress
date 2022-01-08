import axios from 'axios'
const { SERVER_URL } = require('../utils/config')

const apiUrl = `${SERVER_URL}/api/login`

const login = async (credentials) => {
  const response = await axios.post(apiUrl, credentials)
  return response.data
}
const loginService = {
  login
}

export default loginService
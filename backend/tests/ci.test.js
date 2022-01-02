const { sequelize } = require('../utils/db')

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('Server is run correctly', async () => {
  await api
    .get('/api/positions')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

afterAll(() => sequelize.close())
import request from 'supertest'
import { startServer, closeServer, runningServer as server } from 'tests/helpers/server'

describe('Error Handler', () => {
  beforeAll(startServer)

  test('should return 404 status code into response', async () => {
    const getResponse = await request(server).get(`/foo`)
    expect(getResponse.statusCode).toBe(404)
  })

  test('should return 400 status code into response', async () => {
    const getResponse = await request(server).get(`/error-sample`)
    expect(getResponse.statusCode).toBe(400)
    expect(getResponse.body.code).toBe(400)
    expect(getResponse.body.message).toBeDefined()
    expect(getResponse.body.message.length).toBeGreaterThan(0)
  })

  afterAll(closeServer)
})

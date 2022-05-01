import request from 'supertest'

import { startServer, closeServer, runningServer as server } from 'tests/helpers/server'

describe('Health Check', () => {
  beforeAll(startServer)

  test('should return 204 status code into response', done => {
    request(server).get('/health-check').expect(204, done)
  })

  test('should return 404 status code into response', done => {
    request(server).get('/not-found-route').expect(404, done)
  })

  afterAll(closeServer)
})

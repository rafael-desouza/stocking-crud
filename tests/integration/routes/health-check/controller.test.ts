import request from 'supertest'

import { startServer,closeServer, runningServer as server  } from 'tests/helpers/server'


describe('Health Check', () => {
    beforeAll(startServer)
  
    test('deve retornar response com status code 204', done => {
      request(server).get('/health-check').expect(204, done)
    })
  
    test('deve retornar response com status code 404', done => {
      request(server).get('/not-found-route').expect(404, done)
    })
  
    afterAll(closeServer)
  })
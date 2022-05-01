export default {
  get: jest.fn().mockImplementation(() => {
    return Promise.resolve({
      data: {
        name: 'test',
        lastPrice: 100,
        pricedAt: '2020-01-01T00:00:00.000Z'
      }
    })
  })
}

import request from 'supertest'
import { app, sequelize } from '../express'

describe('E2E test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Product 1',
      price: 10,
    })

    expect(response.status).toBe(201)
    expect(response.body.name).toBe('Product 1')
    expect(response.body.price).toBe(10)
  })

  it('should not create a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Product 1',
    })
    expect(response.status).toBe(500)
  })

  it('should list all products', async () => {
    const createResponse1 = await request(app).post('/product').send({
      name: 'Product 1',
      price: 10,
    })
    expect(createResponse1.status).toBe(201)
    const createResponse2 = await request(app).post('/product').send({
      name: 'Product 2',
      price: 20,
    })
    expect(createResponse2.status).toBe(201)

    const response = await request(app).get('/product').send()
    expect(response.status).toBe(200)
    expect(response.body.products.length).toBe(2)
  })

  it('should update a product', async () => {
    const createResponse1 = await request(app).post('/product').send({
      name: 'Product 1',
      price: 10,
    })
    expect(createResponse1.status).toBe(201)
    const id = createResponse1.body.id

    const response = await request(app).put(`/product/${id}`).send({ name: 'Product 1 updated', price: 25 })
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Product 1 updated')
    expect(response.body.price).toBe(25)
  })
})

import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductFactory from '../../../domain/product/factory/product.factory'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import UpdateProductUseCase from './update.product.usecase'

const product1 = ProductFactory.create('a', 'Product 1', 10)

describe('Integration test for product update use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const usecase = new UpdateProductUseCase(productRepository)

    await productRepository.create(product1)
    await usecase.execute({
      id: product1.id,
      name: 'Product 1 updated',
      price: 20,
    })

    const product = await productRepository.find(product1.id)
    expect(product.name).toBe('Product 1 updated')
    expect(product.price).toBe(20)
  })
})

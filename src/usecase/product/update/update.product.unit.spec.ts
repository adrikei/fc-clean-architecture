import ProductFactory from '../../../domain/product/factory/product.factory'
import UpdateProductUseCase from './update.product.usecase'

const product = ProductFactory.create('a', 'Product 1', 10)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test for product update use case', () => {
  it('should update a product', async () => {
    const productRepository = MockRepository()
    const productUpdateUseCase = new UpdateProductUseCase(productRepository)

    const output = await productUpdateUseCase.execute({
      id: product.id,
      name: 'Product 1',
      price: 10,
    })

    expect(output).toEqual({
      id: product.id,
      name: 'Product 1',
      price: 10,
    })
  })
})

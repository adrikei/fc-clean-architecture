import ProductFactory from '../../../domain/product/factory/product.factory'
import FindProductUseCase from './find.product.usecase'

const product = ProductFactory.create('a', 'Product 1', 10)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test find product use case', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository()
    const useCase = new FindProductUseCase(productRepository)

    const input = {
      id: product.id,
    }

    const output = await useCase.execute(input)

    expect(output).toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    })
  })

  it('should not find a product', async () => {
    const productRepository = MockRepository()
    productRepository.find.mockImplementation(() => {
      throw new Error('Product not found')
    })
    const useCase = new FindProductUseCase(productRepository)

    const input = {
      id: 'fake_id',
    }

    expect(() => {
      return useCase.execute(input)
    }).rejects.toThrow('Product not found')
  })
})

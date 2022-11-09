const products = [
  { id: 1, name: 'table', material: 'wood', price: 100 },
  { id: 2, name: 'chair', material: 'wood', price: 15 },
  { id: 3, name: 'bed', material: 'wood', price: 1500 },
]
let maxId = products.reduce((acc, product) => acc = Math.max(acc, product.id), 0)

module.exports = async function routes(fastify, options) {
  fastify.get('/products', async (request, reply) => {
    return products
  })

  fastify.get('/products/:productId', async (request, reply) => {
    const { productId } = request.params
    const product = products.find((p) => p.id == productId)
    if (!product) {
      reply.status(404)
      return
    }
    return product
  })

  fastify.post('/products', async (request, reply) => {
    const newProduct = {
      ...request.body,
      id: ++maxId,
    }
    products.push(newProduct)
    return newProduct
  })

  fastify.patch('/products/:productId', async (request, reply) => {
    const { productId } = request.params
    const product = products.find((p) => p.id == productId)
    if (!product) {
      reply.status(404)
      return
    }
    Object.assign(product, { ...request.body })
    return product
  })

  fastify.delete('/products/:productId', async (request, reply) => {
    const { productId } = request.params
    const index = products.findIndex((p) => p.id == productId)
    if (index === -1) {
      reply.status(404)
      return
    }
    products.splice(index, 1)
    return
  })
}

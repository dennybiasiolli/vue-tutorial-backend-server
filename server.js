// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true,
})

// preventing CORS errors
fastify.addHook('onRequest', async (request, reply) => {
  reply.header('Access-Control-Allow-Origin', '*')
  if (request.method === 'OPTIONS') {
    reply.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Server,Date,access-control-allow-methods,access-control-allow-origin')
    reply.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS,PATCH')
    reply.send()
  }
})

fastify.register(require('./routes/products'))
fastify.register(require('./routes/todos'))
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

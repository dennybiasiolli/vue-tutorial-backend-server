const todos = []
let maxId = todos.reduce((acc, todo) => acc = Math.max(acc, todo.id), 0)

module.exports = async function routes(fastify, options) {
  fastify.get('/todos', async (request, reply) => {
    return todos
  })

  fastify.get('/todos/:todoId', async (request, reply) => {
    const { todoId } = request.params
    const todo = todos.find((p) => p.id == todoId)
    if (!todo) {
      reply.status(404)
      return
    }
    return todo
  })

  fastify.post('/todos', async (request, reply) => {
    const { text } = request.body
    if (!text) {
      reply.status(403)
      return
    }
    const newTodo = {
      ...request.body,
      id: ++maxId,
      completed: false,
    }
    todos.push(newTodo)
    return newTodo
  })

  fastify.patch('/todos/:todoId', async (request, reply) => {
    const { todoId } = request.params
    const todo = todos.find((p) => p.id == todoId)
    if (!todo) {
      reply.status(404)
      return
    }
    Object.assign(todo, { ...request.body })
    return todo
  })

  fastify.delete('/todos/:todoId', async (request, reply) => {
    const { todoId } = request.params
    const index = todos.findIndex((p) => p.id == todoId)
    if (index === -1) {
      reply.status(404)
      return
    }
    todos.splice(index, 1)
    return
  })
}

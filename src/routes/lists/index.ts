import { FastifyInstance } from 'fastify'
import * as listsController from '../../controllers/lists.controller'

async function lists(fastify: FastifyInstance) {

  fastify.get('', listsController.listLists)

  fastify.post('', listsController.addList)

  fastify.delete('/:id', listsController.deleteList)

  fastify.put('/:id', listsController.updateListByID)

  fastify.get('/:id/items', listsController.getItems)

  fastify.post('/:id/items', listsController.addItem)

  fastify.delete('/:id/items/:idItem', listsController.deleteItem)

  fastify.put('/:id/items/:idItem', listsController.updateItem)
}

export default lists
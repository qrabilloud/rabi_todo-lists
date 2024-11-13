import { FastifyInstance } from 'fastify'
import * as listsController from '../../controllers/lists.controller'
import { addListSchema, listListsSchema, deleteListSchema, updateListByIDSchema, getItemsSchema, addItemSchema, deleteItemSchema, updateItemSchema } from '../../schemas'

async function lists(fastify: FastifyInstance) {

  fastify.get('', { schema: listListsSchema }, listsController.listLists)

  fastify.post('', { schema: addListSchema }, listsController.addList)

  fastify.delete('/:id', { schema: deleteListSchema }, listsController.deleteList)

  fastify.put('/:id', { schema: updateListByIDSchema }, listsController.updateListByID)

  fastify.get('/:id/items', { schema: getItemsSchema }, listsController.getItems)

  fastify.post('/:id/items', { schema: addItemSchema }, listsController.addItem)

  fastify.delete('/:id/items/:idItem', { schema: deleteItemSchema }, listsController.deleteItem)

  fastify.put('/:id/items/:idItem', { schema: updateItemSchema }, listsController.updateItem)
}

export default lists
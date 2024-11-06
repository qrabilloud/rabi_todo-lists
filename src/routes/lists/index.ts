import { FastifyInstance } from 'fastify'
import * as listsController from '../../controllers/lists.controller'

async function lists(fastify: FastifyInstance) {

  fastify.get('', listsController.listLists)

  // TODO implement addList in controller
  fastify.post('', listsController.addLists)

  fastify.put('/:id', listsController.updateListByID)

}

export default lists
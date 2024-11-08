import { FastifyReply, FastifyRequest } from "fastify"
import { ITodoList, Item, isState } from "../interfaces/index"
import { REPL_MODE_SLOPPY } from "repl"

export async function listLists(
  request: FastifyRequest, 
  reply: FastifyReply
) {
  console.log('DB status', this.level.db.status)
  const listsIter = this.level.db.iterator()

  const result: ITodoList[] = []
  for await (const [key, value] of listsIter) {
    console.log("This is the key associated : ", key)
    result.push(JSON.parse(value))
  }
  reply.send({ data: result })
}

export async function addList(
  request: FastifyRequest, 
  reply: FastifyReply
) {
  const list = request.body as ITodoList
  list.items.forEach((item) => item.state =  isState(item.state) ? item.state : "PENDING")
  const result = await this.level.db.put(
  list.id.toString(), JSON.stringify(list)
 )
 reply.send({ data: result })
}

export async function deleteList(request: FastifyRequest, reply: FastifyReply){
  const splittedUrl = request.url.split('/') as string[]
  const id = splittedUrl[splittedUrl.length-1]
  const result = await this.level.db.del(id)
  return {data: result}
}

export async function updateListByID(request: FastifyRequest, reply: FastifyReply){
  const updatedFields = request.body as Partial<Omit<ITodoList, "id">>
  const splittedUrl = request.url.split('/') as string[]
  const id = splittedUrl[splittedUrl.length-1]
  console.log("This is the body : ",updatedFields)
  console.log("This is the id of the list to update : ", id)
  /*const updatedList = await this.level.db.get(id, function (err, value) {
    if (err) {
      if (err.notFound) {
        //handle a 'NotFoundError' here
        console.log("Not working")
      }
      else {
        console.log("Tomy UwU <3")
      }
    }
    else {
      const listToUpdate = JSON.parse(value) as ITodoList
      for (const field in updatedFields){
        listToUpdate[field] = updatedFields[field]
      }
      console.log("Before being typed",listToUpdate)
      return listToUpdate
    }
  })*/

  const gottenList = await this.level.db.get(id)
  const listToUpdate = JSON.parse(gottenList) as ITodoList
  for (const field in updatedFields){
    listToUpdate[field] = updatedFields[field]
  }
  console.log(listToUpdate)
  const result = await this.level.db.put(id, JSON.stringify(listToUpdate))
  reply.send({data : result})
}

export async function getItems(request : FastifyRequest, reply: FastifyReply){
  const splittedUrl = request.url.split('/') as string[]
  const id = splittedUrl[splittedUrl.length-2]
  const gottenList = await this.level.db.get(id)
  const list = JSON.parse(gottenList) as ITodoList
  reply.send({data : list.items})
}

export async function addItem(request: FastifyRequest, reply: FastifyReply){
  const newItem = request.body as Item
  newItem.state =  isState(newItem.state) ? newItem.state : "PENDING"
  const splittedUrl = request.url.split('/') as string[]
  const id = splittedUrl[splittedUrl.length-2]
  const gottenList = await this.level.db.get(id)
  const listToUpdate = JSON.parse(gottenList) as ITodoList
  console.log(listToUpdate.items.map((item) => item.id))
  if (listToUpdate.items.some((item) => item.id == newItem.id)){
    listToUpdate.items.splice(listToUpdate.items.findIndex((item) => item.id == newItem.id) , 1, newItem)
  }
  else{
    console.log("Pas id " + newItem.id)
    console.log(listToUpdate)
    listToUpdate.items.push(newItem)
  }
  const result = await this.level.db.put(id, JSON.stringify(listToUpdate))
  reply.send({data : result})
}

export async function deleteItem(request: FastifyRequest, reply: FastifyReply){
  const splittedUrl = request.url.split('/') as string[]
  const idList = splittedUrl[splittedUrl.length-3]
  const gottenList = await this.level.db.get(idList)
  const listToUpdate = JSON.parse(gottenList) as ITodoList
  const idItem = splittedUrl[splittedUrl.length-1]
  if (listToUpdate.items.some((item) => item.id == idItem)){
    listToUpdate.items.splice(listToUpdate.items.findIndex((item) => item.id == idItem) , 1)
    const result = await this.level.db.put(idList, JSON.stringify(listToUpdate))
    reply.send({data : result})
  }
  else reply.send({data : undefined})
}

export async function updateItem(request: FastifyRequest, reply: FastifyReply){
  const splittedUrl = request.url.split('/') as string[]
  const idList = splittedUrl[splittedUrl.length-3]
  const gottenList = await this.level.db.get(idList)
  const listToUpdate = JSON.parse(gottenList) as ITodoList
  const idItem = splittedUrl[splittedUrl.length-1]
  const updatedItem = request.body as Partial<Omit<Item, "id">>
  if (listToUpdate.items.some((item) => item.id == idItem)){
    const itemToUpdate = listToUpdate.items.find((item) => item.id == idItem) as Item
    for (const field in updatedItem){
      itemToUpdate[field] = updatedItem[field]
    }
    const result = await this.level.db.put(idList, JSON.stringify(listToUpdate))
    reply.send({data : result})
  }
  else reply.badRequest("Unexisting itemID")
}
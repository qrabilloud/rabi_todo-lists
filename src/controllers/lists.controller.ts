import { FastifyReply, FastifyRequest } from "fastify"
import { ITodoList } from "../interfaces/index"

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
 const result = await this.level.db.put(
   list.id.toString(), JSON.stringify(list)
 )
 reply.send({ data: result })
}

export async function updateListByID(request: FastifyRequest, reply: FastifyReply){
  const updatedFields = request.body as Partial<ITodoList>
  const splittedUrl = request.url.split('/') as string[]
  const id = splittedUrl[splittedUrl.length-1]
  console.log("This is the body : ",updatedFields)
  console.log("This is the id of the list to update : ", id)
  //const updatedList = await this.level.db.get(id, function (err, value) {
    //if (err) {
      //if (err.notFound) {
        // handle a 'NotFoundError' here
        //console.log("Nique ta mère")
      //}
      //else {
        //console.log("Tomy UwU <3")
      //}
    //}
    //else {
      /*const listToUpdate = JSON.parse(value) as ITodoList
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
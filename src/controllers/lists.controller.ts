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
    result.push(JSON.parse(value))
  }
  reply.send({ data: result })
}

export async function addLists(
  request: FastifyRequest, 
  reply: FastifyReply
) {
 const list = request.body as ITodoList
 const result = await this.level.leveldb.put(
   list.id.toString(), JSON.stringify(list)
 )
 reply.send({ data: result })
}

export async function updateListByID(request: FastifyRequest, reply: FastifyReply){
  const updatedFields = request.body as Partial<ITodoList>
  const reqid = request.id as string
  const id = reqid.substring(reqid.length-1)
  console.log("This is the id : ",id)
  //const result = await this.level.leveldb.get()
  //reply.send({ data: result })
}
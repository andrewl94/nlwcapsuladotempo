import { FastifyInstance } from "fastify";
import { prisma } from "../libs/prisma";
import zod from 'zod';
export async function memoriesRoutes(app: FastifyInstance) {

  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })
    return memories.map(memory => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 150).concat('...')
      }
    })
  })

  app.get('/memories/:id', async (request) => {
    const paramsSchema = zod.object({ id: zod.string().uuid() })
    const { id } = paramsSchema.parse(request.params)
    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      }
    })
    return memory
  })

  app.post('/memories', async (request) => {
    const bodySchema = zod.object({ content: zod.string(), coverUrl: zod.string(), isPublic: zod.coerce.boolean().default(false) })
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)
    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: '1e44235a-3a25-43b8-a7a9-81da997d8ead'
      }
    })
    return memory
  })

  app.put('/memories/:id', async (request) => {
    const paramsSchema = zod.object({ id: zod.string().uuid() })
    const bodySchema = zod.object({ content: zod.string(), coverUrl: zod.string(), isPublic: zod.coerce.boolean().default(false) })
    const { id } = paramsSchema.parse(request.params)
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)
    const memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
        userId: '1e44235a-3a25-43b8-a7a9-81da997d8ead'
      }
    })
    return memory
  })

  app.delete('/memories/:id', async (request) => {
    const paramsSchema = zod.object({ id: zod.string().uuid() })
    const { id } = paramsSchema.parse(request.params)
    await prisma.memory.delete({
      where: {
        id,
      }
    })

  })

}
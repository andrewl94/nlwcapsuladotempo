import { FastifyInstance } from "fastify";
import { prisma } from "../libs/prisma";
import { z } from 'zod';
export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })
  app.get('/memories', async (request) => {
    const userId = request.user.sub;
    const memories = await prisma.memory.findMany({
      where: {
        userId
      },
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

  app.get('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      }
    })

    if (memory.isPublic === true) {
      return memory;
    }

    if (memory.userId === request.user.sub) {
      return memory
    }

    return reply.status(401).send()
  })

  app.post('/memories', async (request) => {
    const bodySchema = z.object({ content: z.string(), coverUrl: z.string(), isPublic: z.coerce.boolean().default(false) })
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)
    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: request.user.sub
      }
    })
    return memory
  })

  app.put('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const bodySchema = z.object({ content: z.string(), coverUrl: z.string(), isPublic: z.coerce.boolean().default(false) })
    const { id } = paramsSchema.parse(request.params)
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    let memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      }
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    memory = await prisma.memory.update({
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

  app.delete('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)
    
    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      }
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    await prisma.memory.delete({
      where: {
        id,
      }
    })

  })

}
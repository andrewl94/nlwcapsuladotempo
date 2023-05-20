import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import fastifyCors from '@fastify/cors'
const app = fastify()
app.register(fastifyCors,{
  origin:true, // Unsafe - Remember to change that
})
app.register(memoriesRoutes)
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('http server running on http://127.0.0.1:3333')
  })

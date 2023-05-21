import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import 'dotenv/config'
import { authRoutes } from './routes/auth'
const app = fastify()
app.register(fastifyCors,{
  origin:true, // Unsafe - Remember to change that
})
app.register(memoriesRoutes)
app.register(authRoutes)
app.register(fastifyJwt,{
  secret: 'spacetime' // Unsafe - Remember to change that
})
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('http server running on http://127.0.0.1:3333')
  })

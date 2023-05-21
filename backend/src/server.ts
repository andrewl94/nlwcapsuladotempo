import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'
import 'dotenv/config'
import { resolve } from 'node:path'

const app = fastify()
app.register(fastifyCors,{
  origin:true, // Unsafe - Remember to change that
})

app.register(require('@fastify/static'),{
  root: resolve(__dirname,'../uploads'),
  prefix: '/uploads'
})

app.register(fastifyMultipart)
app.register(fastifyJwt,{
  secret: 'spacetime' // Unsafe - Remember to change that
})

app.register(memoriesRoutes)
app.register(authRoutes)
app.register(uploadRoutes)
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('http server running on http://127.0.0.1:3333')
  })

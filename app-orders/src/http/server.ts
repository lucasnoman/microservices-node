import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { z } from 'zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(fastifyCors, { origin: true })

app.get('/health', () => {
  return 'OK'
})

app.post(
  '/orders',
  {
    schema: {
      body: z.object({
        amount: z.number(),
      }),
    },
  },
  (request, reply) => {
    const { amount } = request.body

    console.log('Creating an order with amount:', amount)

    return reply.status(201).send()
  }
)

app.listen({ host: '0.0.0.0', port: 3333 }).then(() => {
  console.log('[Orders] HTTP Server running on :3333!')
})

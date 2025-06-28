import '@opentelemetry/auto-instrumentations-node/register'

import { randomUUID } from 'node:crypto'
import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { dispatchOrderCreated } from '../broker/messages/order-created.ts'
import { db } from '../db/client.ts'
import { schema } from '../db/schema/index.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, { origin: true })

app.get('/health', () => {
  return 'OK'
})

app.post(
  '/orders',
  {
    schema: {
      body: z.object({
        amount: z.coerce.number(),
      }),
    },
  },
  async (request, reply) => {
    const { amount } = request.body

    console.log('Creating an order with amount:', amount)

    const orderId = randomUUID()

    await db.insert(schema.orders).values({
      id: randomUUID(),
      customerId: '25f97ed7-d6b7-4220-ad2b-051e58b0546a',
      amount,
    })

    dispatchOrderCreated({
      orderId,
      amount,
      customer: {
        id: '25f97ed7-d6b7-4220-ad2b-051e58b0546a',
      },
    })

    return reply.status(201).send()
  }
)

app.listen({ host: '0.0.0.0', port: 3333 }).then(() => {
  console.log('[Orders] HTTP Server running on :3333!')
})

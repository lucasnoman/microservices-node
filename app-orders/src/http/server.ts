import '@opentelemetry/auto-instrumentations-node/register'

import { randomUUID } from 'node:crypto'
import { setTimeout } from 'node:timers/promises'
import { fastifyCors } from '@fastify/cors'
import { trace } from '@opentelemetry/api'
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
import { tracer } from '../tracer/trace.ts'

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

    const span = tracer.startSpan('Onde começa o debug manual de trace')
    span.setAttribute('hello', 'there!')
    await setTimeout(2000) // Simulate a delay for the sake of the example
    span.end()

    // Add any data the dev need to debug the traces
    trace.getActiveSpan()?.setAttribute('order_id', orderId)

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

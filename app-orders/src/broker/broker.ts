import amqp from 'amqplib'

if (!process.env.BROKER_URL) {
  throw new Error('BROKER_URL is not defined in the environment variables')
}

export const broker = await amqp.connect(process.env.BROKER_URL)

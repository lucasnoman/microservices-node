import { orders } from './channels/orders.ts'

orders.consume(
  'orders',
  async message => {
    if (!message) return null

    console.log(message?.content.toString())

    orders.ack(message) // once aknowledged, the message will be removed from the queue
  },
  {
    noAck: false,
  }
)

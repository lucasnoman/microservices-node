# O que acontece aqui

O serviço de "orders" é dedicado a registrar os pedidos feitos pelo usuários. Ele tem uma conexão com o "invoices", pois cada "order" tem que gerar uma "invoice" (fatura). Dito isso, sua comunicação ocorre atualmente por PUB/SUB usando o RabbitMQ.
Quando um usuário faz um pedido, os dados desse pedido são salvos em banco usando o **Drizzle** e em seguida enviados para o **RabbitMQ** a partir do código dentro de `app-orders/src/broker/messages/order-created.ts`, que usa a `amqplib` para enviar uma mensagem para a fila ("sendToQueue"). Ao enviar a mensagem para a fila, o próprio RabbitMQ o faz com **idempotência**, ou seja, só o faz se a mensagem já não estiver lá, evitando duplicidade de dados.

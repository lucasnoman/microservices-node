# Serviço de Orders

O serviço de "orders" é responsável por registrar pedidos realizados pelos usuários e iniciar o fluxo de geração de faturas (invoices) de forma assíncrona e desacoplada.

## Como funciona a comunicação

- Ao receber um novo pedido, o serviço salva os dados no banco de dados utilizando o **Drizzle**.
- Em seguida, publica uma mensagem no RabbitMQ, utilizando o canal `orders`, através do código em `app-orders/src/broker/messages/order-created.ts`.
- O RabbitMQ garante a entrega idempotente das mensagens, evitando duplicidade de dados.

## Vantagens

- **Desacoplamento:** O serviço de orders não precisa conhecer detalhes do serviço de invoices.
- **Escalabilidade:** Permite processar grandes volumes de pedidos e faturas de forma independente.
- **Idempotência:** O RabbitMQ evita o processamento duplicado de mensagens.

## Fluxo resumido

1. O usuário faz um pedido.
2. O serviço de "orders" salva o pedido no banco de dados.
3. Publica uma mensagem na fila do RabbitMQ (canal `orders`).
4. O serviço de "invoices" consome a mensagem e gera a fatura correspondente.

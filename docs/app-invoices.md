# Serviço de Invoices

O serviço de "invoices" é responsável por processar faturas geradas a partir de pedidos realizados no sistema. Ele consome mensagens enviadas pelo serviço de "orders" através do RabbitMQ, garantindo o processamento confiável e idempotente das faturas.

## Como funciona a comunicação

- O serviço escuta o canal `orders` do RabbitMQ, conforme configurado em `app-invoices/src/broker/subscriber.ts`.
- Ao receber uma mensagem, o serviço processa a fatura correspondente.
- O método `orders.ack(message)` é chamado para informar ao RabbitMQ que a mensagem foi processada com sucesso, removendo-a da fila.
- O parâmetro `noAck: false` garante que o reconhecimento da mensagem é manual, aumentando a confiabilidade do processamento.

## Vantagens

- **Processamento confiável:** Mensagens só são removidas da fila após confirmação explícita.
- **Idempotência:** Garante que cada fatura seja processada apenas uma vez.
- **Desacoplamento:** O serviço de invoices opera de forma independente, apenas reagindo a eventos do RabbitMQ.

## Fluxo resumido

1. O serviço de "orders" publica uma mensagem na fila do RabbitMQ.
2. O serviço de "invoices" consome a mensagem do canal `orders`.
3. Após processar, chama `orders.ack(message)` para remover a mensagem da fila.

# O que acontece aqui

O serviço de "invoices" resgata as mensagens enviadas para a fila do **RabbitMQ** pelo código `app-invoices/src/broker/subscriber.ts`, desde que dentro do canal criado anteriormente, que nesse caso é o `orders`.
No processo de consumir a mensagem, o trecho `orders.ack(message)` diz ao **RabbitMQ** que a mensagem foi tratada com sucesso, removendo-a da fila, dessa forma, não permitindo que ela seja lida novamente por qualquer outro "subscriber". No último parâmetro, de configuração, o `noAck: false` garante que o reconhecimento da mensagem deve ser feito manualmente em vez de simplesmente ser reconhecido ao chegar no broker. Ou seja, garante que o `orders.ack(message)` do callback funcione como deveria.

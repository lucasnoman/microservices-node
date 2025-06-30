# Como o Kong está funcionando neste projeto

O Kong é utilizado neste projeto como um API Gateway, centralizando todas as requisições feitas aos microserviços. Ele atua como uma "porta de entrada" única para os clientes acessarem os serviços `app-orders` e `app-invoices`.

## Por que usar o Kong?

- **Roteamento centralizado:** O Kong recebe todas as requisições HTTP e as encaminha para o microserviço correto, de acordo com o caminho da URL (`/orders` ou `/invoices`).
- **Facilidade de configuração:** Com o Kong, é possível adicionar plugins (como CORS, autenticação, rate limiting, etc.) de forma simples e centralizada, sem precisar alterar o código dos microserviços.
- **Escalabilidade e manutenção:** Os clientes não precisam saber o endereço de cada serviço, apenas do gateway. Isso facilita a manutenção e a escalabilidade do sistema.

## Como está configurado

No arquivo `docker/kong/config.yaml`, o Kong está configurado para:

- Roteamento de `/orders` para o serviço `app-orders` (porta 3333)
- Roteamento de `/invoices` para o serviço `app-invoices` (porta 3334)
- Aplicação do plugin de CORS para permitir requisições de diferentes origens

O Kong roda como um container Docker, definido no `compose.yml` principal do projeto. Ele utiliza o modo declarativo (sem banco de dados), lendo sua configuração diretamente do arquivo YAML.

## Fluxo resumido

1. O cliente faz uma requisição para o gateway (ex: `http://localhost:8000/orders`)
2. O Kong identifica a rota e encaminha a requisição para o microserviço correto
3. O microserviço processa e responde, e o Kong devolve a resposta ao cliente

Dessa forma, o Kong simplifica o gerenciamento e a segurança das APIs neste ambiente de microsserviços.

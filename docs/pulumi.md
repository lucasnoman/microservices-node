# Infraestrutura com Pulumi e AWS

Neste projeto, foi criada a pasta `infra` na raiz para gerenciar a infraestrutura utilizando o Pulumi, uma ferramenta de infraestrutura como código (IaC). O objetivo é provisionar recursos na nuvem AWS de forma automatizada, segura e versionada.

## O que é Pulumi?

Pulumi é uma ferramenta open source que permite criar, atualizar e gerenciar recursos de nuvem usando linguagens de programação como TypeScript, JavaScript, Python, entre outras. Com ele, você descreve toda a infraestrutura como código, facilitando a automação, reprodutibilidade e controle de versões.

## O que é AWS?

AWS (Amazon Web Services) é uma das maiores plataformas de computação em nuvem do mundo, oferecendo serviços como servidores virtuais (EC2), bancos de dados, armazenamento, redes, entre outros.

## O que foi feito aqui?

- Criada a pasta `infra` com um projeto Pulumi em TypeScript.
- Adicionadas dependências do Pulumi e dos provedores AWS necessários no `package.json`.
- O código dentro de `infra` (por exemplo, em `index.ts`) define os recursos que serão criados na AWS, como servidores, redes, bancos de dados, etc.
- Para criar ou atualizar a infraestrutura, basta rodar os comandos do Pulumi (ex: `pulumi up`) dentro da pasta `infra`.

## Como funciona o fluxo

1. Você escreve o código TypeScript descrevendo os recursos desejados.
2. Executa o comando do Pulumi para aplicar as mudanças.
3. O Pulumi se conecta à AWS usando suas credenciais e cria/atualiza os recursos conforme o código.
4. Todo o histórico de mudanças fica registrado, permitindo fácil rollback ou auditoria.

## Vantagens

- Infraestrutura automatizada e versionada junto com o código do projeto.
- Facilidade para replicar ambientes (dev, prod, etc).
- Redução de erros manuais e maior segurança.

Se nunca usou Pulumi ou AWS, basta seguir o código e os exemplos na pasta `infra` para entender como a infraestrutura é criada e gerenciada neste projeto.

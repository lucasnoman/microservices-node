# Microservices Project

This project is a simple demonstration of a microservices architecture using Node.js, RabbitMQ, Docker, and Kong. It consists of two microservices: `app-orders` and `app-invoices`.

## Microservices

### app-orders

This microservice is responsible for creating new orders. It exposes a single API endpoint to receive new orders and publishes a message to a RabbitMQ queue when a new order is created.

**To run:**

```bash
cd app-orders
npm install
npm run dev
```

The service will be available at `http://localhost:3333`.

### app-invoices

This microservice is responsible for processing invoices. It subscribes to the RabbitMQ queue where `app-orders` publishes new order messages, and when it receives a new message, it logs the message to the console.

**To run:**

```bash
cd app-invoices
npm install
npm run dev
```

The service will be available at `http://localhost:3334`.

## Technologies Used

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Fastify:** A fast and low overhead web framework for Node.js.
- **RabbitMQ:** A popular open-source message broker.
- **Docker:** A platform for developing, shipping, and running applications in containers.
- **Drizzle ORM:** A TypeScript ORM for SQL databases.
- **Jaeger:** An open-source, end-to-end distributed tracing system.
- **Kong:** An open-source API gateway and microservices management layer.
- **Pulumi:** An open-source infrastructure as code tool for provisioning cloud resources.
- **AWS (Amazon Web Services):** A cloud computing platform providing infrastructure and services.

## Concepts

### Health Check

Everytime we create an app that'll have **Horizontal Scaling** or **Blue Green Deployment**, the **health check route** (`/health`) is used to check if the app is running. If the app is on air and responding in timely manner.

### Blue Green Deployment

**Blue Green Deployment:** is a software release strategy that minimizes downtime and risk by maintaining two identical production environments: a "blue" environment with the current live application and a "green" environment with the new version. During deployment, a traffic is shifted from the blue environment to the green environment after the new version is tested, allowing for quick rollback if issues arise.

### Statelessness

In the Dockerfile there isn't volume. When deploying an app that can scale horizontally, if I have 40 apps running, it would take too much hard drive space. So the app must be STATELESS. Any information will be stored elsewhere.

**STATELESS:** is an application program that does not save client data generated in one session for use in the next session with that client.

### Drizzle ORM

Drizzle is a TypeScript ORM for SQL databases.

**Drizzle Commands:**
`npx drizzle-kit generate`: **generates** the migrations
`npx drizzle-kit migrate`: **executes** the migrations

### Contracts

**Contracts** are points of truth between all services of what data are trafficking between microservices.

### RabbitMQ

**RabbitMQ:** is a distributed message broker system. It uses the Publish/Subscribe pattern, where an app publishes a message into RabbitMQ, which stores it, then any application that should be able to read these messages is registered as a Subscriber and fetches all the messages on the queue.

### Kong API Gateway

**Kong** is an open-source API gateway that acts as a single entry point for all client requests to your microservices. It provides features such as routing, load balancing, authentication, rate limiting, and more. In this project, Kong is used to centralize and manage access to the `app-orders` and `app-invoices` services.

**Why use Kong here?**

- **Centralized Routing:** Kong receives all incoming API requests and forwards them to the correct microservice based on the request path (e.g., `/orders` or `/invoices`).
- **Security and Control:** By routing all traffic through Kong, you can easily add security features (like authentication or CORS) and monitor traffic in one place.
- **Scalability:** Kong makes it easier to scale your services and manage changes, since clients only need to know the gateway address, not the address of each service.

In this setup, Kong is configured (see `docker/kong/config.yaml`) to route requests to the appropriate service running on your machine. For example, requests to `/orders` are forwarded to the `app-orders` service, and requests to `/invoices` are forwarded to the `app-invoices` service. Kong also applies a CORS plugin to allow cross-origin requests, making it easier to interact with the APIs from different clients.

### Jaeger

**Jaeger**: is an open-source, end-to-end distributed tracing system designed for monitoring and troubleshooting complex, distributed systems like microservices. It helps developers understand how requests flow through various services, identify performance bottlenecks, and troubleshoot issues across interconnected components.
In summary, it reports how long any little thing is taking in each requisition.

### Pulumi & AWS

**Pulumi** is an open-source infrastructure as code (IaC) tool that allows you to define, deploy, and manage cloud resources using familiar programming languages like TypeScript. Instead of manually creating resources in the cloud provider's console, you write code that describes the desired infrastructure, and Pulumi takes care of provisioning and updating those resources.

**AWS (Amazon Web Services)** is a widely-used cloud computing platform that offers a variety of infrastructure and platform services, such as virtual machines, databases, storage, and networking.

In this project, the `infra` directory contains code that uses Pulumi to provision and manage resources on AWS. This approach makes it easy to automate infrastructure setup, ensure consistency across environments, and version control your infrastructure alongside your application code.

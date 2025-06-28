# Microservices Project

This project is a simple demonstration of a microservices architecture using Node.js, RabbitMQ, and Docker. It consists of two microservices: `app-orders` and `app-invoices`.

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

*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Fastify:** A fast and low overhead web framework for Node.js.
*   **RabbitMQ:** A popular open-source message broker.
*   **Docker:** A platform for developing, shipping, and running applications in containers.
*   **Drizzle ORM:** A TypeScript ORM for SQL databases.
*   **Jaeger:** An open-source, end-to-end distributed tracing system.

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

**RabbitMQ:** is a distributed message broker system. It uses Publish/Subscriber pattern, where an app publishes a message into RabbitMQ, which stores it, than any application who should be able to read this messages is registered as Subscriber and fetch all the messages on the queue.

### Jaeger

**Jaeger**: is an open-source, end-to-end distributed tracing system designed for monitoring and troubleshooting complex, distributed systems like microservices. It helps developers understand how requests flow through various services, identify performance bottlenecks, and troubleshoot issues across interconnected components.
In summary, it reports how long any little thing is taking in each requisition.
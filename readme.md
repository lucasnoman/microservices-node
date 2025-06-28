Everytime we create an app that'll have **Horizontal Scaling** or **Blue Green Deployment**, the **health check route** (`/health`) is used to check if the app is running. If the app is on air and responding in timely manner.

**Blue Green Deployment:** is a software release strategy that minimizes downtime and risk by maintaining two identical production environments: a "blue" environment with the current live application and a "green" environment with the new version. During deployment, traffic is shifted from the blue environment to the green environment after the new version is tested, allowing for quick rollback if issues arise.

In the Dockerfile there isn't volume. When deploying an app that can scale horizontally, if I have 40 apps running, it would take too much hard drive space. So the app must be STATELESS. Any information will be stored elsewhere.

**STATELESS:** is an application program that does not save client data generated in one session for use in the next session with that client.

Drizzle Commands:
`npx drizzle-kit generate`: **gera** as migrations
`npx drizzle-kit migrate`: **executa** as migrations

**Contracts** are points of truth between all services of what data are trafficking between microservices.

**RabbitMQ:** is a distributed message broker system. It uses Publish/Subscriber pattern, where an app publishes a message into RabbitMQ, which stores it, than any application who should be able to read this messages is registered as Subscriber and fetch all the messages on the queue.

**Jaeger**: is an open-source, end-to-end distributed tracing system designed for monitoring and troubleshooting complex, distributed systems like microservices. It helps developers understand how requests flow through various services, identify performance bottlenecks, and troubleshoot issues across interconnected components.
In summary, it reports how long any little thing is taking in each requisition.

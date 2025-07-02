import * as awsx from '@pulumi/awsx'
import * as pulumi from '@pulumi/pulumi'

import { cluster } from '../cluster'
import { ordersDockerImage } from '../images/orders'
import { appLoadBalancer } from '../load-balancer'
import { amqpListener } from './rabbitmq'

const ordersTargetGroup = appLoadBalancer.createTargetGroup('orders-target', {
  port: 3333,
  protocol: 'HTTP',
  healthCheck: {
    path: '/health',
    protocol: 'HTTP',
  },
})

export const ordersHttpListener = appLoadBalancer.createListener(
  'orders-listener',
  {
    port: 3333,
    protocol: 'HTTP',
    targetGroup: ordersTargetGroup,
  }
)

// The creation of this ECT with `awsx` automatically enables a Lifecycle Policy, removing older untagged images. This reduces costs and keeps the repository clean.
export const ordersService = new awsx.classic.ecs.FargateService(
  'fargate-orders',
  {
    cluster,
    desiredCount: 1,
    waitForSteadyState: false,
    taskDefinitionArgs: {
      container: {
        image: ordersDockerImage.ref,
        cpu: 256,
        memory: 512,
        portMappings: [ordersHttpListener],
        environment: [
          {
            name: 'BROKER_URL',
            value: pulumi.interpolate`amqp://admin:admin@${amqpListener.endpoint.hostname}:${amqpListener.endpoint.port}`,
          },
          {
            name: 'DATABASE_URL',
            value:
              'postgresql://neondb_owner:npg_jwZCatyQ0iM2@ep-rapid-base-aexilvgo.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
          },
          {
            name: 'OTEL_TRACES_EXPORTER',
            value: 'otlp',
          },
          {
            name: 'OTEL_EXPORTER_OTLP_ENDPOINT',
            value: 'https://otlp-gateway-prod-sa-east-1.grafana.net/otlp',
          },
          {
            name: 'OTEL_EXPORTER_OTLP_HEADERS',
            value:
              'Authorization=Basic MTAxNDMxMzpnbGNfZXlKdklqb2lNVEU1T1RNek15SXNJbTRpT2lKbGRtVnVkRzh0Ym05a1pXcHpJaXdpYXlJNklsZFpSR2h1TVdJME1EUkZNamcxUnpKaFNubHJNVFoxU1NJc0ltMGlPbnNpY2lJNkluQnliMlF0YzJFdFpXRnpkQzB4SW4xOQ==',
          },
          {
            name: 'OTEL_SERVICE_NAME',
            value: 'orders',
          },
          {
            name: 'OTEL_RESOURCE_ATTRIBUTES',
            value:
              'service.name=my-app,service.namespace=my-application-group,deployment.environment=production',
          },
          {
            name: 'OTEL_NODE_RESOURCE_DETECTORS',
            value: 'env,host,os',
          },
          {
            name: 'OTEL_NODE_ENABLED_INSTRUMENTATIONS',
            value: 'http,fastify,pg,amqplib',
          },
        ],
      },
    },
  }
)

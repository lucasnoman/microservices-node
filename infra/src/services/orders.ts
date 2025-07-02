import * as awsx from '@pulumi/awsx'
import * as pulumi from '@pulumi/pulumi'

import { cluster } from '../cluster'
import { ordersDockerImage } from '../images/orders'
import { amqpListener } from './rabbitmq'

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
        ],
      },
    },
  }
)

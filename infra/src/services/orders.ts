import * as awsx from '@pulumi/awsx'

import { cluster } from '../cluster'
import { ordersDockerImage } from '../images/orders'

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
      },
    },
  }
)

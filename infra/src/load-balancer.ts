import * as awsx from '@pulumi/awsx'

import { cluster } from './cluster'

// Handles HTTP/HTTPS traffic
export const appLoadBalancer = new awsx.classic.lb.ApplicationLoadBalancer(
  'app-lb',
  {
    securityGroups: cluster.securityGroups,
  }
)

// Handles amqp (for RabbitMQ) traffic
export const networkLoadBalancer = new awsx.classic.lb.NetworkLoadBalancer(
  'net-lb',
  {
    subnets: cluster.vpc.publicSubnetIds,
  }
)

import * as pulumi from '@pulumi/pulumi'

import { appLoadBalancer } from './src/load-balancer'
import { kongService } from './src/services/kong'
import { ordersService } from './src/services/orders'
import { rabbitMQService } from './src/services/rabbitmq'

export const ordersId = ordersService.service.id
export const rabbitMQId = rabbitMQService.service.id
export const kongId = kongService.service.id
export const rabbitMQAdminUrl = pulumi.interpolate`http://${appLoadBalancer.listeners[0].endpoint.hostname}:15672`

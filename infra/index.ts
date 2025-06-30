import * as aws from '@pulumi/aws'
import * as awsx from '@pulumi/awsx'
import * as docker from '@pulumi/docker-build'
import * as pulumi from '@pulumi/pulumi'

// The creation of this ECT with `awsx` automatically enables a Lifecycle Policy, removing older untagged images. This reduces costs and keeps the repository clean.
const ordersECRRepository = new awsx.ecr.Repository('orders-ecr', {
  forceDelete: true,
})

const ordersECRToken = aws.ecr.getAuthorizationTokenOutput({
  registryId: ordersECRRepository.repository.registryId,
})

const ordersDockerImage = new docker.Image('orders-image', {
  tags: [
    pulumi.interpolate`${ordersECRRepository.repository.repositoryUrl}:latest`,
  ],
  context: { location: '../app-orders' },
  push: true,
  platforms: ['linux/amd64'],
  registries: [
    {
      address: ordersECRRepository.repository.repositoryUrl,
      username: ordersECRToken.userName,
      password: ordersECRToken.password,
    },
  ],
})

const cluster = new awsx.classic.ecs.Cluster('app-cluster')

const ordersService = new awsx.classic.ecs.FargateService('fargate-orders', {
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
})

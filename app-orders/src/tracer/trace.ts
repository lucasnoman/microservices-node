import { trace } from '@opentelemetry/api'

if (!process.env.OTEL_SERVICE_NAME) {
  throw new Error(
    'OTEL_SERVICE_NAME is not defined in the environment variables'
  )
}

export const tracer = trace.getTracer(process.env.OTEL_SERVICE_NAME)

import {
  BatchSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { api, NodeSDK } from '@opentelemetry/sdk-node';
import * as process from 'process';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { B3Propagator } from '@opentelemetry/propagator-b3';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

const oltpExporter = new OTLPTraceExporter({
  url: "https://otlp-gateway-prod-us-east-0.grafana.net/otlp/v1/traces",
  headers: {
    Authorization: `Basic ${btoa('796290:glc_eyJvIjoiOTk2MDk4IiwibiI6InBvYy1ncmFmYW5hLXBvYy1ncmFmYW5hIiwiayI6IjI5NmVoSTNXNW41OUcwRmZmc2U4N3pCWCIsIm0iOnsiciI6InVzIn19')}`
  }
});

const traceExporter = oltpExporter;

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

export const otelSDK = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: `pmvs-nest`,
  }),
  spanProcessor: new BatchSpanProcessor(traceExporter),
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new NestInstrumentation(),
  ],
  textMapPropagator: new B3Propagator(),
});

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(
      () => console.log('SDK shut down successfully'),
      (err) => console.log('Error shutting down SDK', err),
    )
    .finally(() => process.exit(0));
});

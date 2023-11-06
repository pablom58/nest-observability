// metrics.service.ts
import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly histogram: client.Histogram<string>;
  private readonly totalRequests: client.Counter<string>;
  private readonly successfulRequests: client.Counter<string>;
  private readonly failedRequests: client.Counter<string>;

  constructor() {
    client.collectDefaultMetrics();

    this.histogram = new client.Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds histogram',
      labelNames: ['method', 'route', 'code'],
      buckets: [0.1, 0.2, 0.3, 0.4, 0.5, 1, 2, 5],
    });

    this.totalRequests = new client.Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route'],
    });

    this.successfulRequests = new client.Counter({
      name: 'http_requests_successful',
      help: 'Number of successful HTTP requests',
      labelNames: ['method', 'route'],
    });

    this.failedRequests = new client.Counter({
      name: 'http_requests_failed',
      help: 'Number of failed HTTP requests',
      labelNames: ['method', 'route'],
    });
  }

  observe(method: string, route: string, code: number, duration: number) {
    this.histogram.labels(method, route, code.toString()).observe(duration);
    this.totalRequests.labels(method, route).inc();

    if (code >= 200 && code < 400) {
      this.successfulRequests.labels(method, route).inc();
    } else {
      this.failedRequests.labels(method, route).inc();
    }
  }
}
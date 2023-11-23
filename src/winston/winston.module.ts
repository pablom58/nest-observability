import { Module } from "@nestjs/common";
import { WinstonModule as BaseWinstonModule } from 'nest-winston';
import * as winston from 'winston';

const LokiTransport = require('winston-loki')

@Module({
  imports: [
    BaseWinstonModule.forRoot({
      transports: [
        new LokiTransport({
          host: "https://logs-prod-006.grafana.net",
          labels: { instance: 'pmvs-nest', app: 'pmvs-nest', service_name: 'pmvs-nest' },
          json: true,
          basicAuth: "749286:glc_eyJvIjoiOTk2MDk4IiwibiI6InBvYy1ncmFmYW5hLXBvYy1ncmFmYW5hIiwiayI6IjI5NmVoSTNXNW41OUcwRmZmc2U4N3pCWCIsIm0iOnsiciI6InVzIn19",
          format: winston.format.json(),
          replaceTimestamp: true,
          onConnectionError: (err) => console.error(err),
        }),
      ]
    })
  ]
})
export class WinstonModule {}
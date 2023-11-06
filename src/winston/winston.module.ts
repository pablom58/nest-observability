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
          basicAuth: "725448:glc_eyJvIjoiOTc0MDk4IiwibiI6InN0YWNrLTc3MjQ1Mi1obC1yZWFkLXBvYy1sb2tpIiwiayI6IllUeDhoVEZjOFowbTZ6RGJoOTc3MjgzZiIsIm0iOnsiciI6InByb2QtdXMtZWFzdC0wIn19",
          format: winston.format.json(),
          replaceTimestamp: true,
          onConnectionError: (err) => console.error(err),
        }),
      ]
    })
  ]
})
export class WinstonModule {}
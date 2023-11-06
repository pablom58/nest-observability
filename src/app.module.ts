import { MiddlewareConsumer, Module } from '@nestjs/common';
import { WinstonModule } from './winston/winston.module';
import { MetricsMiddleware } from './metrics/middlewares/metrics.middleware';
import { MetricsModule } from './metrics/metrics.module';
import { NewsApiModule } from 'src/news-api/news-api.module';

@Module({
  imports: [WinstonModule, MetricsModule, NewsApiModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes("*")
  }
}

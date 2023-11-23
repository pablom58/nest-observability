import { Module } from '@nestjs/common';
import { WinstonModule } from './winston/winston.module';
import { NewsApiModule } from 'src/news-api/news-api.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [WinstonModule, PrometheusModule.register(), NewsApiModule],
})
export class AppModule { }

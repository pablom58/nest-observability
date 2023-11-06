import { Module } from '@nestjs/common';

import { MetricsService } from './services/metrics.service';
import { MetricsController } from './controllers/metrics.controller';

@Module({
  controllers: [MetricsController],
  providers: [MetricsService],
  exports: [MetricsService]
})
export class MetricsModule {
}

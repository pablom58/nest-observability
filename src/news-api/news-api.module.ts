import { Module } from "@nestjs/common";
import { NewsApiController } from "src/news-api/controllers/news-api.controller";
import { NewsApiService } from "src/news-api/services/news-api.service";

@Module({
  controllers: [NewsApiController],
  providers: [NewsApiService],
  exports: [NewsApiService]
})
export class NewsApiModule {}
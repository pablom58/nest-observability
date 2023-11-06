import { Controller, Get } from '@nestjs/common';
import { NewsApiService } from 'src/news-api/services/news-api.service';

@Controller('news')
export class NewsApiController {
  constructor(private _newsApiService: NewsApiService) { }

  @Get()
  topHeadlines(): any {
    return this._newsApiService.getTopHeadlines();
  }

  @Get('failed')
  topHeadlinesFailedRequest(): any {
    return this._newsApiService.getTopHeadlinesFailedRequest();
  }
}

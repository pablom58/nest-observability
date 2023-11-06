import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import * as NewsApi from 'newsapi'
import { ITopHeadlines } from "src/news-api/interfaces/top-headlines.interface";
import { CustomException } from "src/common/exceptions/custom-exception";
import axios from 'axios'

// const NewsApi = require('newsapi')

@Injectable()
export class NewsApiService {
  private _context = {
    context: this.constructor.name
  }

  private _newsApi

  constructor(@Inject(WINSTON_MODULE_PROVIDER) private _logger: Logger) {
    this._newsApi = new NewsApi('186fac91fb714cd99329ec9f0162dba4')
  }
 
  async getTopHeadlines(): Promise<ITopHeadlines[]> {
    const context = {
      ...this._context,
      method: this.getTopHeadlines.name
    }

    this._logger.info('Get top headlines news', context)
    const response = await Promise.resolve(this._newsApi.v2.topHeadlines())

    if(response.status !== 'ok'){
      this._logger.error('Something failed on getting top headlines news', context)
      throw new CustomException({
        error: 'Something failed on getting top headlines news',
        errorCode: 'TOP_HEADLINES_EXCEPTION',
        statusCode: HttpStatus.BAD_REQUEST
      });
      
    }

    this._logger.info('Returning top headlines articles', context)
    const { articles } = response

    return articles || []
  }

  async getTopHeadlinesFailedRequest(): Promise<ITopHeadlines[]> {
    const context = {
      ...this._context,
      method: this.getTopHeadlinesFailedRequest.name
    }

    this._logger.info('Generate bad client', context)
    try {
      await axios.get('https://newsapi.org/v2/everything?q=Apple&from=2023-11-02&sortBy=popularity&apiKey=API_KEY')
      return []
    } catch (error) {
     this._logger.error(error.message, context) 
      throw new CustomException({
        error: 'Something failed on getting top headlines news',
        errorCode: 'TOP_HEADLINES_EXCEPTION',
        statusCode: HttpStatus.BAD_REQUEST
      });
    }
  }
}
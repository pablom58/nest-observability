// Nestjs dependencies
import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor({
    error,
    errorCode,
    statusCode,
    extra = {},
  }: {
    error: string;
    errorCode: string;
    statusCode: HttpStatus;
    extra?: Record<string, any>;
  }) {
    super(
      {
        extra,
        error,
        errorCode,
      },
      statusCode
    );
  }
}

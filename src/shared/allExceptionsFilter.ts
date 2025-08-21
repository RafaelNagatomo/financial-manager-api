/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && (res as any).message) {
        message = (res as any).message;
      }
    }

    if (Array.isArray((exception as any)?.message)) {
      const validationErrors = (exception as any).message;

      message = this.formatValidationErrors(validationErrors);
      status = HttpStatus.BAD_REQUEST;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
    });
  }

  private formatValidationErrors(errors: ValidationError[]): any[] {
    return errors.map((error) => ({
      field: error.property,
      errors: Object.values(error.constraints || {}),
    }));
  }
}

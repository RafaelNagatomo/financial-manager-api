/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private formatValidationErrors(errors: ValidationError[]): any[] {
    return errors.map((error) => ({
      field: error.property,
      errors: Object.values(error.constraints || {}),
    }));
  }

  public catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      message = (typeof res === 'string')
        ? res
        : (res as any).message || (res as any).error || message;
    }
    
    if (Array.isArray(exception?.message)) {
      message = this.formatValidationErrors(exception.message);
      status = HttpStatus.BAD_REQUEST;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: message,
    });
  }
}

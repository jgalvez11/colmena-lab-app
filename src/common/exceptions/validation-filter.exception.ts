import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(HttpException)
export class ValidationExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      if (exception.getStatus() === HttpStatus.BAD_REQUEST) {
        const errors = exception.getResponse() as ValidationError[];
        const formattedErrors = this.formatErrors(errors);
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          timestamp: new Date().toISOString(),
          path: request.url,
          errors: formattedErrors
        });
      } else {
        super.catch(exception, host);
      }
    }
  }

  private formatErrors(errors: ValidationError[]) {
    const formattedErrors: Record<string, string[]> = {};
    errors.forEach((err) => {
      const property = err.property;
      Object.entries(err.constraints).forEach(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([constraintKey, constraintValue]) => {
          formattedErrors[property] = formattedErrors[property] || [];
          formattedErrors[property].push(constraintValue);
        }
      );
    });
    return formattedErrors;
  }
}

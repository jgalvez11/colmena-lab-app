import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
  RequestTimeoutException
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const response = context.switchToHttp().getResponse();

        if (err instanceof QueryFailedError) {
          return throwError(() => {
            response.status(HttpStatus.CONFLICT).json({
              statusCode: HttpStatus.CONFLICT,
              message: err.message,
              error: err.name
            });
          });
        }

        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }

        return throwError(() => err);
      })
    );
  }
}

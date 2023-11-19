import { ErrorInterceptor } from './error.interceptor';
import { ExecutionContext, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { throwError, firstValueFrom, TimeoutError } from 'rxjs';
import { RequestTimeoutException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

describe('ErrorInterceptor', () => {
  let interceptor: ErrorInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorInterceptor]
    }).compile();

    interceptor = module.get<ErrorInterceptor>(ErrorInterceptor);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should handle QueryFailedError', async () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const context = {
      switchToHttp: () => ({
        getResponse: () => mockResponse
      })
    } as unknown as ExecutionContext;

    const next = {
      handle: () =>
        throwError(
          () =>
            new QueryFailedError(
              'select * from appointments',
              [],
              'Query failed'
            )
        )
    };

    try {
      await firstValueFrom(interceptor.intercept(context, next as any));
    } catch (error) {
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: HttpStatus.CONFLICT,
        message: 'Query failed',
        error: 'QueryFailedError'
      });
    }
  });

  it('should handle TimeoutError', async () => {
    const context = {
      switchToHttp: () => ({
        getResponse: () => ({
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        })
      })
    } as unknown as ExecutionContext;

    const next = {
      handle: () => throwError(() => new TimeoutError())
    };

    try {
      await firstValueFrom(interceptor.intercept(context, next as any));
    } catch (error) {
      expect(error).toBeInstanceOf(RequestTimeoutException);
    }
  });

  it('should handle generic Error', async () => {
    const context = {
      switchToHttp: () => ({
        getResponse: () => ({
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        })
      })
    } as unknown as ExecutionContext;

    const next = {
      handle: () => throwError(() => new Error('Error'))
    };

    try {
      await firstValueFrom(interceptor.intercept(context, next as any));
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});

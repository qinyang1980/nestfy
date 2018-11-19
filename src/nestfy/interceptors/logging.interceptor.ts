import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { logger } from '../utils/log.util';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
    logger.log('Before...');

    const now = Date.now();
    return call$.pipe(tap(() => logger.log(`After... ${Date.now() - now}ms`)));
  }
}

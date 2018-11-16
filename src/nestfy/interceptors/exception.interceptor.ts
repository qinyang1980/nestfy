import { ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
    return call$.pipe(catchError(err => throwError(new HttpException('Message', HttpStatus.BAD_GATEWAY))));
  }
}

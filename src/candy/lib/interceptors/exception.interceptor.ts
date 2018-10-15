import { ExecutionContext, HttpStatus, Interceptor, NestInterceptor } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Interceptor()
export class ExceptionInterceptor implements NestInterceptor {
  public intercept(dataOrRequest: any, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    return stream$.catch((err) => Observable.throw(
      new HttpException('Exception interceptor message', HttpStatus.BAD_GATEWAY)
    ));
  }
}

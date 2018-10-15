import { ExecutionContext, Interceptor, NestInterceptor } from '@nestjs/common';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ResponseUtil } from '../utils';

@Interceptor()
export class TransformInterceptor implements NestInterceptor {
  public intercept(dataOrRequest: any, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    return stream$.map(data => ResponseUtil.ok(data));
  }
}

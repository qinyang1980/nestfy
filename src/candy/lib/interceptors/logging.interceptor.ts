import { ExecutionContext, Interceptor, NestInterceptor } from '@nestjs/common';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

@Interceptor()
export class LoggingInterceptor implements NestInterceptor {
  public intercept(req: any, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    const t = new Date();
    console.info(`>>>>>>>> Started ${t.toLocaleString()} ${req.method} ${req.url} ${req.ip}`);

    return stream$.do((data: any) => {
      const n = new Date();
      const duration = n.getTime() - t.getTime();
      console.info(`<<<<<<<< Completed ${data.status} (${duration}ms)\n\n`);
    });
  }
}

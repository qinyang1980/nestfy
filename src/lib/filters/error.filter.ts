import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import * as express from 'express';
import { ResponseUtil } from '../utils';

@Catch(Error, HttpException)
export class ErrorFilter implements ExceptionFilter {
  public catch(errorOrException: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request: express.Request = ctx.getRequest();
    const response = ctx.getResponse();

    let err = errorOrException;
    if (errorOrException instanceof HttpException) {
      err = handleHttpException(err);
    }

    const ret = ResponseUtil.err(request.url, err);
    response.status(ret.status).json(ret);
  }
}

function handleHttpException(exception: HttpException): Error {
  let err: any;
  const res = exception.getResponse();

  if (typeof res === 'string') {
    err = new Error(res);
  } else if (typeof res === 'object') {
    err = new Error((res as any).message);
  }

  err.status = exception.getStatus();
  err.errors = (exception as any).errors || undefined;
  return err;
}

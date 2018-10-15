import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import * as express from 'express';
import { ResponseUtil } from '../utils';

@Catch(Error, HttpException)
export class ErrorFilter implements ExceptionFilter {
  public catch(errorOrException: any, response: express.Response): void {
    let err = errorOrException;

    if (errorOrException instanceof HttpException) {
      err = handleHttpException(err);
    }

    const ret = ResponseUtil.err(err);
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

  err.httpCode = exception.getStatus();
  return err;
}

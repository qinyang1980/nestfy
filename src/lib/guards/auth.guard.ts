import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import * as express from 'express';
import config from '../config';
import { AUTH_SYMBOL } from '../constants';
import { IVerifyTokenResult, TokenUtil } from '../utils/token.util';

/**
 * @description 通用的验证token的保护器
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const req: express.Request = context.switchToHttp().getRequest();
    const needVerifyToken = this.reflector.get<boolean>(AUTH_SYMBOL, context.getHandler());
    if (needVerifyToken === false) {
      return true;
    }

    const token = req.query.token || req.headers[config.request.auth.headerTag]; // 从query或者header中获取token
    const result: IVerifyTokenResult = TokenUtil.verifyToken(token);

    if (result.success) {
      req[config.request.auth.decodedTag] = result.decodedToken;
      return true;
    } else {
      // invalid
      throw result.error;
    }
  }
}

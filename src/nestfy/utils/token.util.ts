import { BadRequestException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import config from '../config';
import { logger } from '../utils/log.util';

export interface IVerifyTokenResult {
  /**
   * token 校验是否成功
   */
  success: boolean;
  /**
   * 解码后的token对象
   */
  decodedToken?: any;
  /**
   * 校验失败的错误
   */
  error?: any;
}

/**
 * @author andy.qin
 * 产生token，验证token
 */
export class TokenUtil {
  public static genToken(payload: any): string {
    const plainObj = Object.assign({}, payload);
    const token = jwt.sign(plainObj, config.app.auth.secret, { expiresIn: config.app.auth.expiresIn });
    logger.info(`genToken: ${token}`);
    return token;
  }

  public static verifyToken(token: string): IVerifyTokenResult {
    try {
      const decoded = jwt.verify(token, config.app.auth.secret);
      logger.debug('verifyToken - decoded info: %o', decoded);
      return { success: true, decodedToken: decoded };
    } catch (err) {
      logger.error(err);

      let retError = new BadRequestException('token验证失败');
      if (err.name === 'JsonWebTokenError' && err.message === 'jwt must be provided') {
        retError = new BadRequestException('必须提供token');
      } else if (err.name === 'TokenExpiredError' && err.message === 'jwt expired') {
        retError = new BadRequestException('token超时错误');
      }

      return { success: false, error: retError };
    }
  }
}

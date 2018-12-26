import config from '../config';
import { ResponseUtil } from '../utils';
import { IVerifyTokenResult, TokenUtil } from '../utils/token.util';

/**
 * @author andy.qin
 * 校验token的中间件
 */
export const verifyTokenMiddleware = (req, res, next) => {
  const token = req.query.token || req.headers[config.request.auth.headerTag]; // 从query或者header中获取token
  const result: IVerifyTokenResult = TokenUtil.verifyToken(token);

  if (result.success) {
    req.decodedToken = result.decodedToken;
    next();
  } else {
    // invalid
    res.status(result.error.httpCode).json(ResponseUtil.err(req.url, result.error));
  }
};

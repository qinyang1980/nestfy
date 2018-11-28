import { logger } from '../utils/log.util';

/**
 * @author andy.qin
 * 记录请求时间和处理时长的日志中间件
 */
export const requestLogMiddleware = (req, res, next) => {
  const t = new Date();
  logger.debug(`>>>>>>>> Started ${t.toLocaleString()} ${req.method} ${req.url} ${req.ip}`);

  res.on('finish', () => {
    const n = new Date();
    const duration = n.getTime() - t.getTime();

    logger.debug(`<<<<<<<< Completed ${res.statusCode} (${duration}ms)\n\n`);
  });

  next();
};

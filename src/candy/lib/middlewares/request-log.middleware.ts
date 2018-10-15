/**
 * @author andy.qin
 * 记录请求时间和处理时长的日志中间件
 */
export const requestLogMiddleware = (req, res, next) => {
  const t = new Date();
  console.info(`>>>>>>>> Started ${t.toLocaleString()} ${req.method} ${req.url} ${req.ip}`);

  res.on('finish', () => {
    const n = new Date();
    const duration = n.getTime() - t.getTime();

    console.info(`<<<<<<<< Completed ${res.statusCode} (${duration}ms)\n\n`);
  });

  next();
};

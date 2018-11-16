import * as fs from 'fs';
import * as log4js from 'log4js';
import * as mkdirp from 'mkdirp';

const APP_CATEGORY = 'app';
const LOG_LEVEL_DEBUG = 'DEBUG';
const LOG_LEVEL_ERROR = 'ERROR';

export class LogUtil {
  private logger: log4js.Logger;

  constructor(logDir: string) {
    const env = process.env.NODE_ENV || 'development';

    log4js.configure({
      appenders: [
        { type: 'console' },
        { type: 'dateFile', filename: `${logDir}/app.log`, pattern: '-yyyy-MM-dd.log', category: APP_CATEGORY },
        {
          type: 'logLevelFilter',
          level: LOG_LEVEL_ERROR,
          appender: {
            type: 'file',
            filename: `${logDir}/errors.log`,
            maxLogSize: 10485760,
            numBackups: 8
          }
        }
      ],
      replaceConsole: true
    });

    if (!fs.existsSync(logDir)) {
      mkdirp.sync(logDir);
    }

    this.logger = log4js.getLogger(APP_CATEGORY);
    this.logger.setLevel(LOG_LEVEL_DEBUG);

    // 替换console
    log4js.replaceConsole(this.logger);
  }

  get instance(): log4js.Logger {
    return this.logger;
  }
}

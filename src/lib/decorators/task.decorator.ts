import * as schedule from 'node-schedule';
import { logger } from '../utils';
import { TASK_SYMBOL } from './config/symbols';
import { ITaskConfig } from './config/task';

/**
 * @author andy.qin
 * @description ScheduleTask装饰器
 * 替换被ScheduleTask修饰的函数,增加了对cron，日志，错误处理等的统一处理
 */

/* tslint:disable */
export function ScheduleTask(config?: ITaskConfig): Function {
  config = {
    cron: config.cron || '',
    taskName: config.taskName || '',
    printLog: config.printLog || true,
  };

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldValue: Function = descriptor.value;
    config.taskName = propertyKey;

    // save meta data
    const existingTasks: any[] = Reflect.getOwnMetadata(TASK_SYMBOL, target) || [];
    existingTasks.push(config);
    Reflect.defineMetadata(TASK_SYMBOL, existingTasks, target);

    descriptor.value = async function(): Promise<any> {
      try {
        if (config.printLog) {
          logger.info(`Task[${config.taskName}] start  ******************** `);
        }
        await oldValue.apply(this, arguments);
        if (config.printLog) {
          logger.info(`Task[${config.taskName}] finish ******************** \n`);
        }
      } catch (err) {
        logger.error(err);
      }
    };

    // define schedule
    const j = schedule.scheduleJob(config.cron, async () => {
      await descriptor.value.apply(this);
    });

    return descriptor;
  };
}

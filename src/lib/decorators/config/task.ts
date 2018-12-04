export interface ITaskConfig {
  /**
   * 定时任务的模式
   */
  cron: string;
  /**
   * 是否打印日志，默认打印
   */
  printLog?: boolean;
  /**
   * task的函数名
   */
  taskName?: string;
}

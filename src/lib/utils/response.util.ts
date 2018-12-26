import config from '../config';

/**
 * @author andy.qin
 * @description 统一定义返回结果的格式
 */
export interface ICustomResponse {
  /**
   * 时间戳
   */
  timestamp?: Date;
  /**
   * 请求是否成功
   */
  success?: boolean;
  /**
   * HTTP状态码(200,400,404,500)
   */
  status?: number;
  /**
   * 成功才返回的查询数据
   */
  data?: object | object[];
  /**
   * 错误才返回的错误描述
   */
  errors?: any;
  /**
   * 整体描述
   */
  message?: string;
  /**
   * HTTP请求路径
   */
  path?: string;
  /**
   * 扩展属性
   */
  [propName: string]: any;
}

function failedJson(path: string, error: any): ICustomResponse {
  const result: ICustomResponse = {};
  if (config.response.failure.successField.enable) {
    result[config.response.failure.successField.name] = error.status === 200;
  }
  if (config.response.failure.statusField.enable) {
    result[config.response.failure.statusField.name] = error.status || 500;
  }

  const fixedFields = {
    timestamp: new Date(),
    message: error.message || config.response.failure.defaultMessage,
    errors: error.errors || undefined,
    path: path || undefined
  };

  return { ...result, ...fixedFields, ...error };
}

function successJson(message: string, data: object | object[]): any {
  const result: ICustomResponse = {};
  if (config.response.failure.successField.enable) {
    result[config.response.failure.successField.name] = true;
  }
  if (config.response.failure.statusField.enable) {
    result[config.response.failure.statusField.name] = 200;
  }
  const fixedFields = {
    message: message || null,
    data: data || {}
  };

  return { ...result, ...fixedFields };
}

function formatFindAndCount(content: any): any {
  // findAndCount 类型的结果
  if (Array.isArray(content) && content.length === 2) {
    const [a, b] = content;
    if (Array.isArray(a) && Number.isInteger(b)) {
      content = { rows: a, count: b };
    }
  }
  return content;
}

export class ResponseUtil {
  public static ok(data: object | object[]): ICustomResponse {
    return successJson(config.response.success.defaultMessage, formatFindAndCount(data));
  }

  public static err(path: string, error: any): ICustomResponse {
    return failedJson(path, error);
  }
}

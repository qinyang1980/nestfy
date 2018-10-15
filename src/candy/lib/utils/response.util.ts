/**
 * @author andy.qin
 * @description 统一定义返回结果的格式
 */
export interface ICustomResponse {
  /**
   * 请求是否成功
   */
  success: boolean;
  /**
   * HTTP状态码(200,400,404,500)
   */
  status: number;
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
  message: string;
  /**
   * 扩展属性
   */
  [propName: string]: any;
}

function failedJson(error: any): ICustomResponse {
  const result: ICustomResponse = {
    success: error.status === 200,
    status: error.httpCode || error.status || 500,
    message: error.message || null
  };
  return { ...result, ...error };
}

function successJson(message: string, data: object | object[]): any {
  const result: ICustomResponse = {
    success: true,
    status: 200,
    message: message || null,
    data: data || {}
  };
  return result;
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
    return successJson('Request success.', formatFindAndCount(data));
  }

  public static err(error: any): ICustomResponse {
    return failedJson(error);
  }
}

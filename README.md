# Nestfy框架

一个基于Nestjs的后台框架

- [主要功能](#主要功能)
- [导入方式](#导入方式)
- [用法](#用法)

## 主要功能

- 实现了 token 模块
- 实现了 AppUtil 模块, 让建立APP配置化
- 实现了 log 模块
- 实现了 统一异常 处理
- 实现了 统一返回值 格式化 处理

## 导入方式

1.导入 工具类

```js
import { Auth } from 'nestfy';
import { AppUtil, logger } from 'nestfy';
```

## 用法

1. AppUtil

 *将nestfy.json文件放在工程的根目录，写法如下：

```json
{
  // 应用相关配置项
  "app": {
    // 服务的端口号
    "port": 3000,

    // 服务启动成功后，打印此日志
    "setUpMsg": "Nestfy server started",

    // 路由前缀
    "apiPrefix": {
      "enable": true, // 是否启用路由前缀
      "prefix": "/api/rest" // 前缀
    }
  },
  // 日志相关配置项
  "logging": {
    // 是否启用日志
    "enable": true,

    // 日志配置，具体可以参考log4js的官方文档(https://log4js-node.github.io/log4js-node/)
    "configuration": {
      "appenders": {
        "txt": { "type": "dateFile", "filename": "./logs/nestfy.log" },
        "out": { "type": "stdout" }
      },
      "categories": {
        "default": { "appenders": ["out", "txt"], "level": "info" }
      }
    }
  },
  // web请求相关配置项
  "request": {
    // 是否自动记录每次请求的耗时时长(ms)
    "traceRequestDuration": true,

    // 跨域配置
    "cors": {
      // 是否启用跨域
      "enable": true
    },

    // bodyParser第三方中间件配置
    "bodyParser": {
      // 是否启用bodyParser
      "enable": true,

      // Body的容量限制(mb)
      "limit": "5mb"
    },
    // DTO类自动校验相关配置
    "validation": {
      "enable": true, // 是否启用自动校验功能
      "skipMissingProperties": true // 不存在的属性，是否跳过校验
    },
    // 接口权限控制相关配置
    "auth": {
      "enable": false, // 是否启用，启用后请求如果不携带token信息，将无法调用所有接口
      "headerTag": "x-access-token", // 放在header里面的tag的名称
      "secret": "i6r5LgMJdoa5trlM", // 加密的密钥
      "expiresIn": "24h", // 失效时长
      "decodedTag": "user" // 解密后放在req对象里面的字段的名称
    }
  },
  // web返回相关配置项
  "response": {
    // 成功情况配置
    "success": {
      // message字段的默认文本
      "defaultMessage": "执行成功!",

      // success字段配置
      "successField": {
        "enable": true, // 是否启用success字段
        "name": "success" // 字段的名字
      },

      // status字段配置
      "statusField": {
        "enable": true, // 是否启用status字段
        "name": "status" // 字段的名字
      }
    },
    // 失败情况配置
    "failure": {
      // message字段的默认文本
      "defaultMessage": "执行失败!",

      // success字段配置
      "successField": {
        "enable": true, // 是否启用success字段
        "name": "success" // 字段的名字
      },
      // status字段配置
      "statusField": {
        "enable": true, // 是否启用status字段
        "name": "status" // 字段的名字
      }
    }
  },
  // swagger相关配置
  "swagger": {
    "enable": true, // 是否启用swagger文档功能
    "title": "nestfy-starter", // 文档的title
    "description": "The photo API description", // 文档的描述
    "schemas": "http", // 接口是否安全，仅支持(http 和 https两种)
    "version": "1.0", // 文档的版本
    "email": "qinyang_1980@qq.com", // 作者的联系email
    "path": "/doc" // 文档路由
  }
}
```

  *然后在程序中导入 AppUtil 类，如下使用方式：

```js
import { AppUtil } from 'nestfy';
import { ApplicationModule } from './modules/app.module';

AppUtil.bootstrap(ApplicationModule);
```

2.Auth

  *放在函数前面，用于禁止该路由的token验证

```js
  @Auth(false)
  @Get('/extends')
  public async extends(@Query() query: any): Promise<any> {
    return this._admAwardService.extends(query.date);
  }
```
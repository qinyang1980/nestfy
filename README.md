# Nestfy 框架

一个基于 Nestjs 的 Restful 后台框架。

> 本框架旨在帮助开发人员快速搭建一套成型的企业后台 REST 应用。<br>
> 使用本框架之前需要先了解 [Nestjs 框架](https://docs.nestjs.com)
> 如何使用本框架请参考 [Nestfy的使用例子工程](https://github.com/qinyang1980/nestfy-starter)
---

[TOC]

## 如何安装

npm:
`npm install --save nestfy`

yarn:
`yarn add nestfy`

## 使用方法

### 日志

本框架集成了 log4js 日志模块，开启日志功能需要在配置文件中开启日志功能，并进行配置。

如下给出几种工程中常用的配置：

> 日志只输出到 console 控制台

```typescript
"logging": {
  "enable": true,

  // 日志配置，
  "configuration": {
    "appenders": {
      "console": { "type": "stdout" }
    },
    "categories": {
      "default": { "appenders": ["console"], "level": "info" }
    }
  }
},
```

> 日志输出到控制台，并且还输出到 2 个文件，一个文件是记录所有日志，一个文件只记录错误日志
>
> 日志文件如果超过 maxLogSize 设置的容量，则会产生新文件
>
> 旧的日志文件会自动进行备份，备份文件会被压缩为 gz 格式
>
> backups 设置保存日志文件的个数，多出的则被删除

```typescript
"logging": {
  "enable": true,

  // 日志配置
  "configuration": {
    "appenders": {
      "txt": {
        "type": "file",
        "filename": "./logs/app.log",
        "maxLogSize": 10485760,
        "backups": 10,
        "compress": true
      },
      "err": { "type": "file", "filename": "./logs/err.log", "maxLogSize": 10485760, "backups": 5, "compress": true },
      "out": { "type": "stdout" }
    },
    "categories": {
      "default": { "appenders": ["out", "txt"], "level": "debug" },
      "error": { "appenders": ["err"], "level": "error" }
    }
  }
}
```

> 日志输出到控制台和一个文件中
> 每天会产生一个新的日志文件，备份的旧文件会以日期命名

```typescript
"logging": {
  "enable": true,

  // 日志配置，
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
```

更详细的配置项，请参考 [log4js 官方文档](https://log4js-node.github.io/log4js-node/)

### 跨域

允许所有请求 <推荐配置>

```typescript
"cors": {
  "enable": true,
  "configuration": {}
}
```

只允许从 example.com 过来的请求

```typescript
"cors": {
  "enable": true,
  "configuration": {
    "origin": "http://example.com"
  }
}
```

更详细的配置参数，请参考 CORS 官网 `https://github.com/expressjs/cors`

### 参数校验

web 请求的参数可以自动被校验。
本框架可以从全局来进行控制，是否启用 DTO 参数校验的功能。

```typescript
"validation": {
  "enable": true,
  "configuration": {
    "skipMissingProperties": true
  }
}
```

具体的配置参数，可以参考[class-validator 官网](https://github.com/typestack/class-validator)

只有校验参数成功后，才进入 Controller 层；如果校验失败，则框架会抛出 Validation 异常，自动返回  错误的 JSON 结果给客户端。

示例如下：

> query-photo.dto.ts

```typescript
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class QueryPhotosDto {
  @ApiModelProperty({ description: '查询偏移量', required: true })
  @IsDefined()
  @Type(() => Number)
  @IsInt()
  public offset: number;

  @ApiModelProperty({ description: '查询个数', required: true })
  @IsDefined()
  @Type(() => Number)
  @IsInt()
  public limit: number;

  @ApiModelProperty({ description: '名称', required: false })
  @IsString()
  @IsNotEmpty()
  public readonly name: string;
}
```

> 错误请求(不符合如上 DTO 要求的请求)，被框架处理后的返回结果:

```json
{
  "success": false,
  "status": 400,
  "timestamp": "2019-01-24T09:57:44.261Z",
  "message": "You have an error in your request's body. Check 'errors' field for more details!",
  "errors": [
    {
      "target": {},
      "property": "offset",
      "children": [],
      "constraints": {
        "isDefined": "offset should not be null or undefined"
      }
    },
    {
      "target": {},
      "property": "limit",
      "children": [],
      "constraints": {
        "isDefined": "limit should not be null or undefined"
      }
    }
  ],
  "path": "/api/rest/v1/photos"
}
```

### 自动记录 web 请求时间

项目开发的过程中，有时候需要在日志中打印出 web 请求到达的时间，后台处理消耗的时长，请求返回的时间等信息。
使用本框架，直接在`nestfy.json`配置文件中将如下开关开启即可。

```typescript
"request": {
  // 是否自动记录每次请求的耗时时长(ms)
  "traceRequestDuration": true
}
```

### auth 模块

该模块适用于基于 token 认证的后台项目，如果使用 session 机制，请关闭此开关。
 开关开启后，会在全局范围内启用 token 认证，每一个 web 请求，都会去解析 header 中是否包含 token 信息，解析后的结果会存放在 express.Request 对象的由 decodedTag 指定的属性中。如下配置，就是存放在 req.user 中。

```typescript
"auth": {
  "enable": false, // 是否启用，启用后请求如果不携带token信息，将无法调用所有接口
  "headerTag": "x-access-token", // 放在header里面的tag的名称
  "secret": "i6r5LgMJdoa5trlM", // 加密的密钥
  "expiresIn": "24h", // 失效时长
  "decodedTag": "user" // 解密后放在req对象里面的字段的名称
}
```

有些接口，在用户未登录的时候，也需要能够访问，这时候可以使用 @Auth 注解

放在函数前面，用于禁止该路由的 token 验证

```typescript
  import { Auth } from 'nestfy';
  ...
  @Auth(false)
  @Get('/extends')
  public async extends(@Query() query: any): Promise<any> {
    return this._admAwardService.extends(query.date);
  }
```

### swagger 支持

开启功能可以使用swagger自动产生API文档，可用配置如下，swagger的使用方法请看[这里](https://docs.nestjs.com/recipes/swagger)

```typescript
"swagger": {
  "enable": true, // 是否启用swagger文档功能
  "title": "nestfy-starter", // 文档的title
  "description": "The photo API description", // 文档的描述
  "schemas": "http", // 接口是否安全，仅支持(http 和 https两种)
  "version": "1.0", // 文档的版本
  "email": "qinyang_1980@qq.com", // 作者的联系email
  "path": "/doc" // 文档路由
}
```

### AppUtil

一个工具类，

请将名为 nestfy.json 的配置文件放在工程的根目录，模板如下：

!> 请带注释一起 copy，nestfy 可以识别 jsonc 格式的配置文件。

> nestfy.json

```typescript
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
      "enable": true,

      // 具体配置请参考Cors官方网站(https://github.com/expressjs/cors)
      "configuration": {}
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

然后在程序中导入 AppUtil 类，如下使用方式：

```typescript
import { AppUtil } from 'nestfy';
import { ApplicationModule } from './modules/app.module';

AppUtil.bootstrap(ApplicationModule);
```

这样，一条语句即完成了应用类的创建，运行成功后，还会打印出  成功日志。

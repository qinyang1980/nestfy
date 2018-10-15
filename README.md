# Candy框架
一个基于Nest，TypeORM的后台框架

- [主要功能](#主要功能)
- [导入方式](#导入方式)
- [用法](#用法)

## 主要功能

- 集成了 Nest 框架
- 集成了 TypeORM 框架
- 集成了 class-validator 模块
- 集成了 class-transformer 模块

- 实现了 token 模块
- 实现了 error 模块
- 实现了 AppUtil 模块
- 实现了 log 模块

## 导入方式

1. 导入Nest框架
```js
'candy/web/common == @nestjs/common'
'candy/web/core == @nestjs/core'
'candy/web/microservices == @nestjs/microservices'
'candy/web/testing == @nestjs/testing'
'candy/web/websockets == @nestjs/websockets'
```

2. 导入 TypeORM 框架
```js
'candy/orm == typeorm'
```

3. 导入 swagger
```js
'candy/swagger == @nestjs/swagger'
```

4. 导入 class-transformer
```js
'candy/class-transformer == class-transformer'
```

5. 导入 class-validator
```js
'candy/class-validator == class-validator'
```

6. 导入 工具类 
```js
import { Auth } from 'candy';
import { CandyError } from 'candy';
import { AppUtil, LogUtil } from 'candy';
```

## 用法

1. AppUtil

  * 将candy.json文件放在工程的根目录，写法如下：

```json
{
  "app": {
    "port": 3000,
    "setUpMsg": "Candy server is listening on port 3000",
    "cors": {
      "enable": true
    },
    "bodyParser": {
      "enable": true,
      "limit": "10mb"
    },
    "validation": {
      "enable": true
    },
    "logRequest": {
      "enable": true
    },
    "auth": {
      "enable": true,
      "headerTag": "x-access-token",
      "secret": "i6r5LgMJdoa5trlM",
      "expiresIn": "24h",
      "decodedTag": "user"
    }
  },
  "swagger": {
    "enable": true,
    "title": "candy-starter",
    "description": "The photo API description",
    "version": "1.0",
    "path": "/doc"
  }
}
```
  * 然后在程序中导入 AppUtil 类，如下使用方式：

```js
import { AppUtil } from 'candy';
import { ApplicationModule } from './modules/app.module';

AppUtil.bootstrap(ApplicationModule);
```
<br>

2. CandyError

  * 先定义errors集合，每一个error都是一个数组。
数组的第一个元素类型是number，代表错误号，第二个元素类型是number，代表http错误码，第三个元素类型是string，代表错误提示。

```js
import { HttpStatus } from 'candy/common';

export const errors = {
  // -1000 ~ -1200 （通用错误)
  ERR_DB_CONNECTION: [-1000, HttpStatus.INTERNAL_SERVER_ERROR, '数据库连接失败！'],
  ERR_DB_WRONG_SQL: [-1001, HttpStatus.INTERNAL_SERVER_ERROR, 'SQL语法错误！'],

  // -1300 ~ -1400 (用户账号错误)
  ERR_USER_WRONG_PASS: [-1300, HttpStatus.NOT_FOUND, '用户不存在'],
  ERR_USER_WRONG_VCODE: [-1301, HttpStatus.BAD_REQUEST, '手机号或验证码有误'],
  ERR_USER_ALREADY_EXISTED: [-1302, HttpStatus.BAD_REQUEST, '账号已存在'],
  ERR_USER_VCODE_OVERTIME: [-1303, HttpStatus.BAD_REQUEST, '验证码校验失败，验证码超时！'],

  ERR_PARAM_WRONG: [-1401, HttpStatus.BAD_REQUEST, '参数有误'],
  ERR_PARAM_WRONG_TABLE: [-1402, HttpStatus.BAD_REQUEST, 'table有误'],
  ERR_COPY_ENTITY_WRONG: [-1403, HttpStatus.NOT_FOUND, '未找到要复制的数据'],
  ERR_COPY_TARGET_WRONG: [-1404, HttpStatus.NOT_FOUND, '未找到要目标的数据']

};

```

  * 使用这些errors

```js
import { CandyError } from 'candy';

...
throw new CandyError(config.errors.ERR_USER_ALREADY_EXISTED);

```
<br>

3. Auth

  * 放在函数前面，用于禁止该路由的token验证

```js
  @Auth(false)
  @Get('/extends')
  public async extends(@Query() query: any): Promise<any> {
    return this._admAwardService.extends(query.date);
  }
```
# Candy框架
一个基于Nestjs的后台框架

- [主要功能](#主要功能)
- [导入方式](#导入方式)
- [用法](#用法)

## 主要功能

- 实现了 token 模块
- 实现了 AppUtil 模块
- 实现了 log 模块

## 导入方式

1. 导入 工具类 
```js
import { Auth } from 'candy';
import { AppUtil, LogUtil } from 'candy';
```

## 用法

1. AppUtil

  * 将candy.json文件放在工程的根目录，写法如下：

```json
{
  "app": {
    "port": 3000,
    "setUpMsg": "Candy server started.",
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

2. Auth

  * 放在函数前面，用于禁止该路由的token验证

```js
  @Auth(false)
  @Get('/extends')
  public async extends(@Query() query: any): Promise<any> {
    return this._admAwardService.extends(query.date);
  }
```
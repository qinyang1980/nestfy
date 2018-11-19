import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import config from '../config';
import { ErrorFilter } from '../filters/error.filter';
import { AuthGuard } from '../guards/auth.guard';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { requestLogMiddleware } from '../middlewares/request-log.middleware';
import { ValidationPipe } from '../pipes/validation.pipe';
import { logger } from './log.util';

export class AppUtil {
  public static async bootstrap(appModule: any): Promise<void> {
    const app = await NestFactory.create(appModule);

    if (config.app.bodyParser.enable) {
      app.use(bodyParser.json({ limit: config.app.bodyParser.limit }));
      app.use(bodyParser.urlencoded({ limit: config.app.bodyParser.limit, extended: false }));
    }

    // 跨域支持
    if (config.app.cors.enable) {
      app.use(cors());
    }

    // 日志配置
    if (config.app.log.enable) {
      logger.level = config.app.log.level;
      if (config.app.log.traceRequestDuration) {
        app.use(requestLogMiddleware);
      }
    }

    // 校验Request
    if (config.app.validation.enable) {
      app.useGlobalPipes(new ValidationPipe());
    }

    // token校验
    if (config.app.auth.enable) {
      app.useGlobalGuards(new AuthGuard(new Reflector()));
    }

    // 统一错误处理
    app.useGlobalFilters(new ErrorFilter());

    // 统一response格式化处理
    app.useGlobalInterceptors(new TransformInterceptor());

    if (config.swagger.enable) {
      const options = new DocumentBuilder()
        .setTitle(config.swagger.title)
        .setDescription(config.swagger.description)
        .setVersion(config.swagger.version)
        .build();
      const document = SwaggerModule.createDocument(app, options);
      SwaggerModule.setup(config.swagger.path, app, document);
    }

    app.listen(config.app.port, () => {
      console.info(config.app.setUpMsg);
    });
  }
}

import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { configure } from 'log4js';
import config from '../config';
import { ErrorFilter } from '../filters/error.filter';
import { AuthGuard } from '../guards/auth.guard';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { requestLogMiddleware } from '../middlewares/request-log.middleware';
import { ValidationPipe } from '../pipes';
import { logger } from './log.util';

/* tslint:disable */
export class AppUtil {
  public static async bootstrap(appModule: any): Promise<void> {
    const app = await NestFactory.create(appModule);

    if (config.request.bodyParser.enable) {
      app.use(bodyParser.json({ limit: config.request.bodyParser.limit }));
      app.use(bodyParser.urlencoded({ limit: config.request.bodyParser.limit, extended: false }));
    }

    // 跨域支持
    if (config.request.cors.enable) {
      app.enableCors(config.request.cors.configuration);
    }

    // 是否打印请求
    if (config.request.traceRequestDuration) {
      app.use(requestLogMiddleware);
    }

    // 日志配置
    if (config.logging.enable) {
      configure(config.logging.configuration);
    }

    // 校验Request
    if (config.request.validation.enable) {
      app.useGlobalPipes(
        new ValidationPipe(config.request.validation.configuration),
      );
    }

    // 路由前缀
    if (config.app.apiPrefix.enable) {
      app.setGlobalPrefix(config.app.apiPrefix.prefix);
    }

    // token校验
    if (config.request.auth.enable) {
      app.useGlobalGuards(new AuthGuard(new Reflector()));
    }

    // 统一错误处理
    app.useGlobalFilters(new ErrorFilter());

    // 统一response格式化处理
    app.useGlobalInterceptors(new TransformInterceptor());

    const schemas =
      config.swagger.schemas === 'http' || config.swagger.schemas === 'https' ? config.swagger.schemas : 'http';

    if (config.swagger.enable) {
      const options = new DocumentBuilder()
        .setTitle(config.swagger.title)
        .setBasePath(config.app.apiPrefix.prefix)
        .setDescription(config.swagger.description)
        .setVersion(config.swagger.version)
        .setSchemes(schemas)
        .setContactEmail(config.swagger.email)
        .build();
      const document = SwaggerModule.createDocument(app, options);
      SwaggerModule.setup(config.swagger.path, app, document);
    }

    app.listen(config.app.port, () => {
      logger.info(config.app.setUpMsg);
    });
  }
}

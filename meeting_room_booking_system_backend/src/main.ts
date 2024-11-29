import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FormatResponseInterceptor } from './format-response.interceptor';
import { InvokeRecordInterceptor } from './invoke-record.interceptor';
import { UnloginFilter } from './unlogin.filter';
import { CustomExceptionFilter } from './custom-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 全局启用 ValidationPipe：
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // body 参数自动转换类型，否则时间格式会被识别为字符串
  }));
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  app.useGlobalInterceptors(new InvokeRecordInterceptor());
  app.useGlobalFilters(new UnloginFilter());
  app.useGlobalFilters(new CustomExceptionFilter());

  app.enableCors();

  app.use(cookieParser());

  // 静态文件目录 http://localhost:3005/uploads/1732690067126-279053387-stacy.jpg
  // 这个端口是后端接口的端口，前端项目的端口是 3000
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  });

  const config = new DocumentBuilder()
    .setTitle('会议室预订系统')
    .setDescription('API 接口文档')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: 'JWT 授权',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  await app.listen(configService.get('nest_server_port'));

  // await app.listen(3000);
}
bootstrap();

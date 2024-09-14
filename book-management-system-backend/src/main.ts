import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const app = await NestFactory.create(AppModule);

  app.useStaticAssets(join(__dirname, '../uploads'), {prefix: '/uploads'});

  // 校验请求体的参数
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 转为 dto 的实例
    }),
  );

  app.enableCors();

  await app.listen(3000);
}
bootstrap();

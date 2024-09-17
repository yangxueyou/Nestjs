import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true, // 让 nest 服务支持跨域
  });
  await app.listen(3000);
}
bootstrap();

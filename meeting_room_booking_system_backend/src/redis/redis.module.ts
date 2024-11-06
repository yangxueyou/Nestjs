import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

// 这里用 @Global() 把它声明为全局模块，这样只需要在 AppModule 里引入，别的模块不用引入也可以注入 RedisService 了。
@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory(configService: ConfigService) {
        console.log(configService.get('redis_server_host'));
        console.log(configService.get('redis_server_port'));

        const client = createClient({
          socket: {
            host: configService.get('redis_server_host'),
            port: configService.get('redis_server_port'),
          },
          database: configService.get('redis_server_db'), // database 指定为 1，因为我们之前都是用的默认的 0
        });
        await client.connect();
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}

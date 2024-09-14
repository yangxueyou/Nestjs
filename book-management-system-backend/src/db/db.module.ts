import { DynamicModule, Module } from '@nestjs/common';
import { DbService } from './db.service';

export interface DbModuleOptions {
  path: string
}

@Module({})
export class DbModule {
  // register 方法里接收 options 参数，返回 providers、exports 等模块配置
  static register(options: DbModuleOptions ): DynamicModule {
    return {
      module: DbModule,
      providers: [ // useValue 来声明为 provider
        {
          provide: 'OPTIONS', // token 为 OPTIONS
          useValue: options, 
        },
        DbService,
      ],
      exports: [DbService]
    };
  }
}

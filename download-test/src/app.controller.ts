import { Controller, Get, Res, Header, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('download')
  // download(@Res() res: Response) {
  //   const content = fs.readFileSync('package.json');

  //   res.set('Content-Disposition', `attachment; filename="guang.json"`);

  //   res.end(content);
  // }

  // 跟上面一样
  @Get('download')
  @Header('Content-Disposition', `attachment; filename="guang.json"`)
  download(@Res() res: Response) {
    // 返回文件总长度
    const content = fs.readFileSync('package.json');

    res.end(content);
  }

  // 在 nest 里最好不要直接用 node 的 stream api。
  // 因为它有很多事件，比如 data、error、end 等，自己处理还是挺麻烦的。
  @Get('download2')
  @Header('Content-Disposition', `attachment; filename="guang.json"`)
  download2(@Res() res: Response) {
    // 最后一个为空代表结束
    const stream = fs.createReadStream('package.json');

    stream.pipe(res);
  }

  // StreamableFile：解决上面的问题
  @Get('download3')
  download3() {
    const stream = fs.createReadStream('package.json');

    return new StreamableFile(stream, {
      disposition: `attachment; filename="guang.json"`,
    });
  }

  @Get('download4')
  download4() {
    const stream = fs.createReadStream('package.json');

    return new StreamableFile(stream, {
      type: 'text/plain',
      disposition: `attachment; filename="guang.json"`,
    });
  }
}

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

// 直接 @Catch 指定 HttpException，修改返回的响应格式
@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    response.statusCode = exception.getStatus();

    const res = exception.getResponse() as { message: string[] };

    response.json({
      code: exception.getStatus(),
      message: 'fail',
      data: res?.message?.join ? res?.message?.join(',') : exception.message
    }).end();
  }
}

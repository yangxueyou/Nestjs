import { Controller, Get, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // 一旦用 @Response 注入了响应对象，就不能通过 return 的方式来返回响应内容了，需要手动调用 res.send
  getHello(@Request() request: FastifyRequest, @Response({ passthrough: true }) reply: FastifyReply) {
    reply.header('url', request.url)
    // reply.send('hello')
    return 'hello return'
  }
}

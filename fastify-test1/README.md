```bash
$ nest new fastify-test -p pnpm
$ npm run start:dev
```

### 注意版本：其它软件版本需要升级到对应的版本


### 注意事项：一旦用 @Response 注入了响应对象，就不能通过 return 的方式来返回响应内容了，需要手动调用 res.send

通过 passthrough: true 可以实现 return 返回
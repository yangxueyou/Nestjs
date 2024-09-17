# 启动前端代码

```bash
$ npx http-server .
```

# 后端

- 安装项目
    - nest new nest-multer-upload -p npm
- 安装下 multer 的 ts 类型的包
    - npm install -D @types/multer
- 生成一个 pipe
    - nest g pipe file-size-validation-pipe --no-spec --flat
- 启动项目
    - npm run start:dev


# 原理

Nest 的文件上传也是基于 multer 实现的，它对 multer api 封装了一层，提供了 FileInterceptor、FilesInterceptor、FileFieldsInterceptor、AnyFilesInterceptor 的拦截器，分别用到了 multer 包的 single、array、fields、any 方法。

它们把文件解析出来，放到 request 的某个属性上，然后再用 @UploadedFile、@UploadedFiles 的装饰器取出来传入 handler。

并且这个过程还可以使用 ParseFilePipe 来做文件的验证，它内置了 MaxFileSizeValidator、FileTypeValidator，你也可以实现自己的 FileValidator。
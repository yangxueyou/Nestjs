import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Body,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpException,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  FileInterceptor,
  FilesInterceptor,
  FileFieldsInterceptor,
  AnyFilesInterceptor,
} from '@nestjs/platform-express';
import { storage } from './storage';
import { FileSizeValidationPipe } from './file-size-validation-pipe.pipe';
import { MyFileValidator } from './my-validator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('aaa')
  @UseInterceptors(
    // 使用 FileInterceptor 来提取 aaa 字段，这个就是前端传过来的文件对应的key
    // 然后通过 UploadedFile 装饰器把它作为参数传入
    // formdata.append('aaa', item)  formdata.set('aaa', fileInput.files[0])
    FileInterceptor('aaa', {
      dest: 'uploads', // 用 npm run start:dev 把服务跑起来，一保存，就可以看到这个目录uploads被创建了：
    }),
  )
  // 其他字段通过 @Body 装饰器获取
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log('body', body);
    console.log('file', file);
  }

  @Post('eee')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  // FileSizeValidationPipe 自定义验证器
  uploadFile2(
    @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('file', file);
  }

  // 多文件上传
  @Post('bbb')
  @UseInterceptors(
    FilesInterceptor('bbb', 3, {
      dest: 'uploads',
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', files);
  }

  // 多个文件的字段
  @Post('ccc')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'aaa', maxCount: 2 },
        { name: 'bbb', maxCount: 3 },
      ],
      {
        dest: 'uploads',
      },
    ),
  )

  // 不知道有哪些字段是 file
  uploadFileFields(
    @UploadedFiles()
    files: { aaa?: Express.Multer.File[]; bbb?: Express.Multer.File[] },
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', files);
  }

  // @Post('ddd')
  // @UseInterceptors(
  //   AnyFilesInterceptor({
  //     dest: 'uploads',
  //   }),
  // )
  // uploadAnyFiles(
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  //   @Body() body,
  // ) {
  //   console.log('body', body);
  //   console.log('files', files);
  // }

  // 自定义存储位置
  @Post('ddd')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: storage,
    }),
  )
  uploadAnyFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', files);
  }

  @Post('fff')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFile3(
    @UploadedFile(
      new ParseFilePipe({
        exceptionFactory: (err) => {
          throw new HttpException('xxx' + err, 404);
        },
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('file', file);
  }

  @Post('ggg')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFile4(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MyFileValidator({})], // 使用内置的 MyFileValidator 验证器
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('file', file);
  }
}

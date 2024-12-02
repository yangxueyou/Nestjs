import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';

export class UpdateUserPasswordDto extends PickType(RegisterUserDto, [
  'email',
  'captcha',
  'username',
  'password',
]) {
  // @IsNotEmpty({
  //   message: '用户名不能为空',
  // })
  // @ApiProperty()
  // username: string;
  // @IsNotEmpty({
  //   message: '密码不能为空',
  // })
  // @MinLength(6, {
  //   message: '密码不能少于 6 位',
  // })
  // @ApiProperty({ minLength: 6 })
  // password: string;
  // @IsNotEmpty({
  //   message: '邮箱不能为空',
  // })
  // @IsEmail(
  //   {},
  //   {
  //     message: '不是合法的邮箱格式',
  //   },
  // )
  // @ApiProperty({ format: 'email' })
  // email: string;
  // @IsNotEmpty({
  //   message: '验证码不能为空',
  // })
  // @ApiProperty()
  // captcha: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';

export class UpdateUserDto extends PickType(RegisterUserDto, [
  'email',
  'captcha',
]) {
  // 这里 headPic 和 nickName 就不做非空约束了，也就是说可以不改
  @ApiProperty()
  headPic: string;

  @ApiProperty()
  nickName: string;
  // @IsNotEmpty({
  //   message: '邮箱不能为空',
  // })
  // @IsEmail(
  //   {},
  //   {
  //     message: '不是合法的邮箱格式',
  //   },
  // )
  // @ApiProperty()
  // email: string;
  // @IsNotEmpty({
  //   message: '验证码不能为空',
  // })
  // @ApiProperty()
  // captcha: string;
}

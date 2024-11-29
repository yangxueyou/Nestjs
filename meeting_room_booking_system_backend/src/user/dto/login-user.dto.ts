import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @ApiProperty()
  username: string;

  @IsNotEmpty({
    message: '密码不能为空',
  })
  @ApiProperty()
  password: string;
}


export class LoginUserDtoAuth {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @ApiProperty()
  username: string;

  @IsNotEmpty({
    message: '密码不能为空',
  })
  @ApiProperty()
  password: string;

  accessToken: string;

  userInfo: {
    id: number;
    username: string;
    email: string;
    role: string;
    roles: string[];
    permissions: string[];
  }

  refreshToken: string;
}

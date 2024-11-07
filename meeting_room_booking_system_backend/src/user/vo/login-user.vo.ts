// interface UserInfo {
//   id: number;

//   username: string;

//   nickName: string;

//   email: string;

//   headPic: string;

//   phoneNumber: string;

//   isFrozen: boolean;

//   isAdmin: boolean;

//   createTime: number;

//   roles: string[];

//   permissions: string[];
// }

// export class LoginUserVo {
//   userInfo: UserInfo;

//   accessToken: string;

//   refreshToken: string;
// }

import { ApiProperty } from '@nestjs/swagger';

// 之前这里的 UserInfo 是 interface，这里要改成 class 才能加装饰器
class UserInfo {
  @ApiProperty()
  id: number;

  @ApiProperty({ example: 'zhangsan' })
  username: string;

  @ApiProperty({ example: '张三' })
  nickName: string;

  @ApiProperty({ example: 'xx@xx.com' })
  email: string;

  @ApiProperty({ example: 'xxx.png' })
  headPic: string;

  @ApiProperty({ example: '13233333333' })
  phoneNumber: string;

  @ApiProperty()
  isFrozen: boolean;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  createTime: number;

  @ApiProperty({ example: ['管理员'] })
  roles: string[];

  @ApiProperty({ example: 'query_aaa' })
  permissions: string[];
}
export class LoginUserVo {
  @ApiProperty()
  userInfo: UserInfo;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

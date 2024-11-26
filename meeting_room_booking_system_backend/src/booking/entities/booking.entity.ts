import { MeetingRoom } from '../../../src/meeting-room/entities/meeting-room.entity';
import { User } from '../../../src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
var dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Shanghai');

export const dateTransformer = {
  from: (value: Date) => {
    return dayjs.tz(value).format('YYYY-MM-DD HH:mm:ss');
  },
  to: (value: Date) => {
    return dayjs.tz(value).format('YYYY-MM-DD HH:mm:ss');
  },
};

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '会议开始时间',
    transformer: dateTransformer,
  })
  startTime: Date;

  @Column({
    comment: '会议结束时间',
    transformer: dateTransformer,
  })
  endTime: Date;

  @Column({
    length: 20,
    comment: '状态（申请中、审批通过、审批驳回、已解除）',
    default: '申请中',
  })
  status: string;

  @Column({
    length: 100,
    comment: '备注',
    default: '',
  })
  note: string;

  @ManyToOne(() => User)
  user: User;

  //   这里 Booking 和 User、MeetingRoom 是多对一的关系
  @ManyToOne(() => MeetingRoom)
  room: MeetingRoom;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;
}

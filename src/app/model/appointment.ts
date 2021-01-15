import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

import { BaseModel } from './base';

@EntityModel({
  name: 'appointment',
})
/**
 * 预约表
 */
export class AppointmentModel extends BaseModel {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 190,
    comment: '客户名称',
    name: 'user_name',
  })
  userName: string;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: true,
    comment: '联系电话',
    name: 'user_phone',
  })
  userPhone: string;

  @Column({
    type: 'integer',
    nullable: true,
    comment: '客户性别',
    name: 'user_gender_type',
  })
  userGenderType: number;

  @Column({
    type: 'datetime',
    name: 'pre_time',
    comment: '预约时间',
  })
  preTime: Date;

  @Column({
    type: 'datetime',
    name: 'arrived_time',
    comment: '到店时间',
  })
  arrivedTime: Date;

  @Column({
    type: 'datetime',
    name: 'end_time',
    comment: '服务完成时间',
  })
  endTime: Date;

  @Column({
    type: 'datetime',
    name: 'total_time',
    comment: '服务花费时间',
  })
  totalTime: Date;

  @Column({
    type: 'integer',
    name: 'pets_type',
    comment: '状态，(1:猫, 2:狗)',
  })
  petsType: number;

  @Column({
    type: 'integer',
    name: 'service_type',
    comment: '服务类型，(1:洗, 2:美, 3:寄)',
  })
  serviceType: number;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '描述信息',
  })
  description: string;

  @Column({
    type: 'integer',
    comment: '状态，(1:已预约, 2:服务中, 3:已完成, 4已取消)',
  })
  status: number;
}

import { Entity, Column, Generated, CreateDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('aureussetting')
export class UserSettingEntity extends BaseEntity {
  @Column({ nullable: true })
  type: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  createdTime: Date;

  @Column({ nullable: true })
  updatedTime: Date;
}

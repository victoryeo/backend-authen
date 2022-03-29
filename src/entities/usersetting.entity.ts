import { Entity, Column, BeforeInsert, CreateDateColumn } from 'typeorm';
import bcrypt from 'bcrypt';
import { BaseEntity } from './base.entity';

@Entity('usersetting')
export class UserSettingEntity extends BaseEntity {

  @Column()
  username: string;

  @Column()
  password: string;

  @BeforeInsert()  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);  
  }
}

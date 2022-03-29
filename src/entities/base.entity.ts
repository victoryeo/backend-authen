import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdTime: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedTime: Date;
}

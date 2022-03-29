import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSettingEntity } from '../../entities/usersetting.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([UserSettingEntity])],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
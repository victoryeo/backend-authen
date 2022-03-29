import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { UserSettingEntity } from '../../entities/usersetting.entity';
import { UserSettingResourceModel } from '../../dtos/userSettingResourceModel';
import { toUserDto } from '../../common/mapper';

@Injectable()
export class RootService {
  constructor(
    @InjectRepository(UserSettingEntity)
    private userSettingRepository: Repository<UserSettingEntity>
  ) {}


}
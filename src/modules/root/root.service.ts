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

  async findOne(options?: object): Promise<UserSettingResourceModel> {
    const user =  await this.userSettingRepository.findOne(options);
    return toUserDto(user);  
  }

  async findByLogin({ username, password }: UserSettingEntity): Promise<UserSettingResourceModel> {    
    const user = await this.userSettingRepository.findOne({ where: { username } });
    
    if (!user) {
        throw ('User not found');    
    }
    
    // compare passwords
    const areEqual = (user.password === password)

    if (!areEqual) {
        throw ('Invalid credentials');    
    }
    
    return toUserDto(user);  
  }

}
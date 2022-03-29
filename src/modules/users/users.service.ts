import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { UserSettingEntity } from '../../entities/usersetting.entity';
import { UserSettingResourceModel } from '../../dtos/userSettingResourceModel';
import { toUserDto } from '../../common/mapper';
import { UserLoginResourceModel } from '../../dtos/userLoginResourceModel';
import { comparePasswords } from '../../common/mapper';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserSettingEntity)
    private userSettingRepository: Repository<UserSettingEntity>
  ) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  /*async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }*/

  async findOne(options?: object): Promise<UserSettingResourceModel> {
    Logger.log(`findOne ${JSON.stringify(options)}`) 
    const user =  await this.userSettingRepository.findOne(options);
    Logger.log(`findOne ${user}`)  
    return toUserDto(user);  
  }

  async findByLogin({ username, password }: UserLoginResourceModel): Promise<UserSettingResourceModel> {  
    Logger.log(`findByLogin ${username}`) 
    const user = await this.userSettingRepository.findOne({ where: { username } });
    
    if (!user) {
        throw ('User not found');    
    }
    
    // compare passwords    
    const areEqual = await comparePasswords(user.password, password);
    
    if (!areEqual) {
        throw ('Invalid credentials');    
    }
    
    return toUserDto(user);  
  }

  async findByPayload(username : any): Promise<UserSettingResourceModel> {
    Logger.log(`findByPayload ${username}`) 
    return await this.findOne({ 
        where:  { username } 
      });  
  }

  async create(userDto: UserLoginResourceModel): Promise<UserSettingResourceModel> {    
    const { username, password } = userDto;
    
    // check if the user exists in the db    
    const userInDb = await this.userSettingRepository.findOne({ 
        where: { username } 
    });
    if (userInDb) {
        throw ('User already exists');    
    }
    
    Logger.log(`create ${username} ${password}`);
    const user: UserSettingEntity = await this.userSettingRepository.create({ username, password });
    Logger.log(user)
    await this.userSettingRepository.save(user);
    Logger.log('save success')
    return toUserDto(user);  
  }
}
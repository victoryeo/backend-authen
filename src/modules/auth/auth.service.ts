import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegistrationStatus } from '../../dtos/registrationStatus';
import { UserSettingEntity } from 'src/entities/usersetting.entity';
import { UserLoginResourceModel } from '../../dtos/userLoginResourceModel';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    Logger.log(`login ${JSON.stringify(user)}`)
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: UserLoginResourceModel): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
        success: true,   
        message: 'user registered',
    };
    
    try {
        Logger.log(`register ${JSON.stringify(userDto)}`)
        await this.usersService.create(userDto);
    } catch (err) {
        status = {
            success: false,        
            message: err,
        };    
    }
    return status;  
}
}
import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegistrationStatus } from '../../dtos/registrationStatus';
import { UserSettingEntity } from '../../entities/usersetting.entity';
import { UserLoginResourceModel } from '../../dtos/userLoginResourceModel';
import { UserSettingResourceModel } from '../../dtos/userSettingResourceModel';
import { LoginStatus } from '../../dtos/loginStatus';
import { JwtPayload } from '../../dtos/jwtPayload';

@Injectable()
export class AuthService {
  JWT_EXPIRE: number  = 600;
  
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  /*async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }*/

  async validateUser(username: string, pass: string): Promise<UserSettingResourceModel> {
    Logger.log(`validateUser ${username}`)
    const user = await this.usersService.findByPayload(username);
    Logger.log(`validateUser ${user}`)
    if (!user) {
        Logger.log('Invalid token');    
        return null;
    }    
    return user;  
  }

  /*async login(user: any) {
    Logger.log(`login ${JSON.stringify(user)}`)
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }*/

  async login(loginUserDto: UserLoginResourceModel): Promise<LoginStatus> {   
    Logger.log(`login ${loginUserDto}`) 
    // find user in db    
    const user = await this.usersService.findByLogin(loginUserDto);
    
    // generate and sign token    
    const token = this._createToken(user);
    
    return {
        username: user.username, ...token,    
    };  
  }

  private _createToken({ username }: UserSettingResourceModel): any {
    const user: JwtPayload = { username };    
    const accessToken = this.jwtService.sign(user);    
    return {
        expiresIn: this.JWT_EXPIRE,
        accessToken,    
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
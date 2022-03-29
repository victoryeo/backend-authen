import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { RegistrationStatus } from '../../dtos/registrationStatus';
import { UserLoginResourceModel } from '../../dtos/userLoginResourceModel';

@Controller('')
export class RootController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() req: UserLoginResourceModel): Promise<RegistrationStatus> {
    const result: 
    RegistrationStatus = await this.authService.register(req);
    if (!result.success) {
        throw (result.message);    
    }
    return result;  
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
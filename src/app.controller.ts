import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log('login')
    return req.user;
  }
}
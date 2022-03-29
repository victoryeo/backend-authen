import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RootService } from './root.service';
import { RootController } from './root.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [RootController],
  providers: [RootService],
  exports: [RootService],
})
export class RootModule {}
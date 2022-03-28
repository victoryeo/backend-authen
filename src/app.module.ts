import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HealthModule } from './modules/health/health.module';
import { AssetModule } from './modules/asset/asset.module';
import { HttpErrorFilter } from './common/http-error.filter';
import { LoggingInterceptor } from './common/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    HealthModule,
    AssetModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}

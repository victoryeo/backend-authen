import {
  HttpModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import validator from '../../common/openapi';
import { BCUtil } from '../../common/util';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';

const DB_PORT = parseInt(process.env.TYPEORM_PORT, 10);
@Module({
  imports: [HttpModule],
  controllers: [AssetController],
  providers: [AssetService, BCUtil],
  exports: [AssetService],
})
export class AssetModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(validator.validate('get', '/assets'))
      .forRoutes({ path: 'assets', method: RequestMethod.GET });
  }
}

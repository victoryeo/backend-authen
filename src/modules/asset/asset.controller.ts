import { Query, Controller, Get } from '@nestjs/common';
import { AssetService } from './asset.service';

@Controller('assets')
export class AssetController {
  constructor(private assetService: AssetService) {}

  @Get()
  getAllAssets(
    @Query('owner') owner: string,
  ): Promise<any> {
    return this.assetService.getAllAssets(owner);
  }

  @Get('hello')
  getHello(): string {
    console.log("hello")
    return 'hello';
  }
}

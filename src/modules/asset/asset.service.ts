import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';

import { BCUtil } from '../../common/util';

@Injectable()
export class AssetService {
  constructor(private bcUtil: BCUtil) {}

  /**
   * Get all assets
   */
  async getAllAssets(
    owner: string
  ): Promise<any> {

    const address: string = owner;
    Logger.log(address, 'Request params');
    // call smart contract
    const retData = await this.bcUtil.sendGetRequestToBC(address);
    Logger.log(retData, 'Response');

    return retData;
  }
}

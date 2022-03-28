import { Injectable } from '@nestjs/common';

@Injectable()
export class BCUtil {
  constructor() {}

  async sendGetRequestToBC(params): Promise<any> {

    console.log(params)
    let ret: any
    return ret;
  }
}

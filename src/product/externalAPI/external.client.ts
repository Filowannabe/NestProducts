import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SecurityClient {
  constructor(private httpService: HttpService) {}

  async validateToken(token: string): Promise<object> {
    const { data } = await this.httpService
      .post(`${process.env.SECURITY_SERVICE}/security/validate-token`, {
        token: token,
      })
      .toPromise();

    return data;
  }
}

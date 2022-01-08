import { Inject, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { SecurityClient } from '../externalAPI/external.client';

export class AuditMiddleware implements NestMiddleware {
  constructor(@Inject(SecurityClient) private securityClient: SecurityClient) {}
  async use(req: Request, res: Response, next: any) {
    try {
      const { token } = req.headers;
      const payload = await this.securityClient.validateToken(token.toString());

      if (payload) next();
    } catch (error) {
      throw new UnauthorizedException('Bad request');
    }
  }
}

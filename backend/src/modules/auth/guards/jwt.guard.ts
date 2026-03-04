import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) return false;

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) return false;

    try {
      const payload = this.jwtService.verify(token, { secret: 'MY_SUPER_SECRET' });
      // attach user info to request
      (request as any).user = payload;
      return true;
    } catch (err) {
      return false;
    }
  }
}

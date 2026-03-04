import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true; // no roles required

    const request = context.switchToHttp().getRequest();
    const user = request.user; // user added by JwtAuthGuard

    return requiredRoles.includes(user.role); // true if user has a valid role
  }
}
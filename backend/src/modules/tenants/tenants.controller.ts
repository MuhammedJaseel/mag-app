import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { TenantsService } from './tenants.service';
import { Request } from 'express';
import { Roles } from '../auth/guards/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get('me')
  @Roles('tenant-admin', 'tenant-user')
  getUser(@Req() req: Request) {
    const tenantId = req['user'].tenantId;
    return this.tenantsService.getUser(tenantId);
  }
}

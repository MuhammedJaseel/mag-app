import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Request } from 'express';
import { Roles } from '../../auth/guards/roles.decorator';
import { IngestService } from './ingest.service';
import { ApiQuery } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/tenants/ingest')
export class IngestController {
  constructor(private readonly ingestService: IngestService) {}

  @Get(':campaign_id')
  @ApiQuery({
    name: 'type',
    required: false,
    enum: ['opened', 'clicked_more', 'liked'],
  })
  @Roles('tenant-admin', 'tenant-user')
  getUser(
    @Req() req: Request,
    @Param('campaign_id') campaign_id: string,
    @Query('type') type: 'opened' | 'clicked_more' | 'liked',
  ) {
    const tenantId = req['user'].tenantId;
    return this.ingestService.getCampaign(tenantId, campaign_id, type);
  }
}

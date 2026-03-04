import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto, UpdateCampaignDto } from './campaigns.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { Request } from 'express';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/user')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post('create-campaign')
  @Roles('tenant-admin')
  create(@Body() createCampaignDto: CreateCampaignDto, @Req() req: Request) {
    const tenantId = req['user'].tenantId;
    return this.campaignsService.create(tenantId, createCampaignDto);
  }

  @Get('list-campaign')
  @Roles('tenant-admin', 'tenant-user')
  findAll(@Req() req: Request) {
    const tenantId = req['user'].tenantId;
    return this.campaignsService.findAll(tenantId);
  }

  @Get('get-campaign/:id')
  @Roles('tenant-admin', 'tenant-user')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const tenantId = req['user'].tenantId;
    return this.campaignsService.findOne(id, tenantId);
  }

  @Put('update-campaign/:id')
  @Roles('tenant-admin')
  update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
    @Req() req: Request,
  ) {
    const tenantId = req['user'].tenantId;
    return this.campaignsService.update(id, tenantId, updateCampaignDto);
  }

  @Delete('delete-campaign/:id')
  @Roles('tenant-admin')
  remove(@Param('id') id: string, @Req() req: Request) {
    const tenantId = req['user'].tenantId;
    return this.campaignsService.remove(id, tenantId);
  }
}

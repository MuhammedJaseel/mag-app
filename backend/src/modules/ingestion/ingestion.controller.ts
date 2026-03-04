import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { QueueService } from '../queue/queue.service';
import { CampaignEventDto } from './ingestion.dto';
import { Request } from 'express';

@Controller()
export class IngestionController {
  constructor(private readonly queueService: QueueService) {}

  _getDeviceInfo(req: Request) {
    const _ip =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;

    return {
      ip_address: _ip.toString(),
      user_agent: req.headers['user-agent'],
    };
  }

  @Post('api/track-event/:tenantId')
  async sendRequest(
    @Req() req: Request,
    @Body() body: CampaignEventDto,
    @Param('tenantId') tenantId: string,
  ) {
    const info = this._getDeviceInfo(req);
    await this.queueService.addRequest({ ...body, tenantId, ...info });
    return { status: 'Request Succefully queued' };
  }
}

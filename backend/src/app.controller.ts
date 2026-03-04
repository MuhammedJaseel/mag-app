import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { QueueService } from './modules/queue/queue.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly queueService: QueueService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Post('send-request')
  async sendRequest(@Body() body: any) {
    await this.queueService.addRequest(body);
    return { status: 'Request queued' };
  }
}

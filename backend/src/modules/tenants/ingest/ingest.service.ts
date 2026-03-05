import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from 'src/database/entities/campaign.entity';
import { Event } from 'src/database/entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IngestService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaognRepository: Repository<Campaign>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async getCampaign(
    tenant_id: string,
    campaign_id: string,
    event_type: 'opened' | 'clicked_more' | 'liked',
  ): Promise<any> {
    const campaign = await this.campaognRepository.findOne({
      where: { id: campaign_id, tenant_id },
    });

    if (!campaign)
      throw new HttpException('Campaign not found', HttpStatus.NOT_FOUND);

    const events = await this.eventRepository.findOne({
      where: { campaign_id, tenant_id, event_type },
    });

    return { ...campaign, events };
  }
}

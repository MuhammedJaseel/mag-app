import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from 'src/database/entities/campaign.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  create(tenantId: string, createCampaignDto: any) {
    const campaign = this.campaignRepository.create({
      ...createCampaignDto,
      tenant_id: tenantId,
    });
    return this.campaignRepository.save(campaign);
  }

  findAll(tenantId: string) {
    return this.campaignRepository.find({
      where: { tenant_id: tenantId },
    });
  }

  findOne(id: string, tenantId: string) {
    return this.campaignRepository.findOne({
      where: { id, tenant_id: tenantId },
    });
  }

  async update(id: string, tenantId: string, updateCampaignDto: any) {
    const campaign = await this.findOne(id, tenantId);
    if (campaign) Object.assign(campaign, updateCampaignDto);
    return campaign;
  }

  remove(id: string, tenantId: string) {
    this.campaignRepository.delete({ id, tenant_id: tenantId });
  }
}

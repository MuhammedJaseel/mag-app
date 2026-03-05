import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Campaign } from 'src/database/entities/campaign.entity';
import { CampaignsService } from './campaigns/campaigns.service';
import { CampaignsController } from './campaigns/campaigns.controller';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { IngestService } from './ingest/ingest.service';
import { IngestController } from './ingest/ingest.controller';
import { Tenant } from 'src/database/entities/tenant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant]),
    TypeOrmModule.forFeature([Campaign]),
    TypeOrmModule.forFeature([Event]),
  ],
  providers: [TenantsService, CampaignsService, IngestService, JwtService],
  controllers: [TenantsController, CampaignsController, IngestController],
})
export class TenantsModule {}

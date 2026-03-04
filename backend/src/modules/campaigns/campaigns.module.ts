import { Module } from '@nestjs/common';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Campaign } from 'src/database/entities/campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  providers: [CampaignsService, JwtService],
  controllers: [CampaignsController],
})
export class CampaignsModule {}

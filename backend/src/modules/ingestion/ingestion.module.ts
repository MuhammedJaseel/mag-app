import { Module } from '@nestjs/common';
import { IngestionController } from './ingestion.controller';
import { QueueService } from '../queue/queue.service';

@Module({
  controllers: [IngestionController],
  imports: [],
  providers: [QueueService],
})
export class IngestionModule {}

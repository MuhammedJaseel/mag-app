import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngestionModule } from './modules/ingestion/ingestion.module';
import { AuthModule } from './modules/auth/auth.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { CommonModule } from './modules/common/common.module';
import { QueueModule } from './modules/queue/queue.module';
import { AppController } from './app.controller';

import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: +process.env.DB_PORT || 5432,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || '',
        autoLoadEntities: true,
        synchronize: false,

        migrationsRun: true,
        migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
      }),
    }),
    IngestionModule,
    AuthModule,
    CampaignsModule,
    CommonModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IngestionModule } from './modules/ingestion/ingestion.module';
import { AuthModule } from './modules/auth/auth.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { CommonModule } from './modules/common/common.module';
import { QueueModule } from './modules/queue/queue.module';
import { AppController } from './app.controller';

import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD', '4040'),
        database: config.get<string>('DB_NAME', 'mag_db'),
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

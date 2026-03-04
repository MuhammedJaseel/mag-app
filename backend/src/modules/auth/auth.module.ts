import { Module } from '@nestjs/common';
import { AppController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Tenant } from 'src/database/entities/tenant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Tenant]),
  ],
  providers: [AuthService, JwtService],
  controllers: [AppController],
})
export class AuthModule {}

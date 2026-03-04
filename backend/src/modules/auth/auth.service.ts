import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import * as bcrypt from 'bcrypt';
import { Tenant } from 'src/database/entities/tenant.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async login(
    tenantId: string,
    email: string,
    password: string,
  ): Promise<{ token: string }> {
    const tenant = await this.tenantsRepository.findOne({
      where: { unique_name: tenantId },
    });

    if (!tenant) {
      throw new HttpException('Tenant not found', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.usersRepository.findOne({
      where: { email, tenant_id: tenant.id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const secret = process.env.JWT_SECRET;

      const payload = {
        userId: user.id,
        email,
        tenantId: tenant.id,
        role: user.role,
      };

      const token = this.jwtService.sign(payload, { secret, expiresIn: '1h' });
      return { token };
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }
}

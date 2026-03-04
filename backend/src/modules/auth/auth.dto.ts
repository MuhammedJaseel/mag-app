import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'tenant_1', description: 'Tenant ID' })
  @IsString()
  tenantId: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsString()
  password: string;
}


export class LoginResponseDto {
  @ApiProperty({ example: 'jwt_token_here', description: 'JWT access token' })
  token: string;
}
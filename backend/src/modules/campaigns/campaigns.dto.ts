import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsNotEmpty } from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty({ example: 'tenant_1', description: 'Tenant ID' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This is a campaign description',
    description: 'Campaign description',
  })
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    example: '2023-01-01',
    description: 'Campaign start date',
  })
  @IsString()
  @IsOptional()
  start_date?: string;

  @ApiProperty({
    example: '2023-12-31',
    description: 'Campaign end date',
  })
  @IsString()
  @IsOptional()
  end_date?: string;
}

export class UpdateCampaignDto {
  @ApiProperty({ example: 'tenant_1', description: 'Tenant ID' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'This is an updated campaign description',
    description: 'Updated campaign description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '2023-01-01',
    description: 'Campaign start date',
  })
  @IsString()
  @IsOptional()
  start_date?: string;

  @ApiProperty({
    example: '2023-12-31',
    description: 'Campaign end date',
  })
  @IsString()
  @IsOptional()
  end_date?: string;
}

export class CampaignResponseDto {
  @ApiProperty({ example: 'campaign_1', description: 'Campaign ID' })
  id: string;

  @ApiProperty({ example: 'Campaign Name', description: 'Campaign name' })
  name: string;

  @ApiProperty({
    example: 'Campaign description',
    description: 'Campaign description',
  })
  description: string;

  @ApiProperty({
    example: '2023-01-01',
    description: 'Campaign start date',
  })
  start_date?: string;

  @ApiProperty({
    example: '2023-12-31',
    description: 'Campaign end date',
  })
  @ApiProperty({ example: '2023-12-31', description: 'Campaign end date' })
  end_date?: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Campaign creation date',
  })
  created_at: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Campaign update date',
  })
  updated_at: Date;
}

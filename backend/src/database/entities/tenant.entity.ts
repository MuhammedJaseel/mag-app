import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  Unique,
} from 'typeorm';

@Entity('tenants')
@Unique(['unique_name'])
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  unique_name: string;

  @Column()
  tenant_name: string;

  @CreateDateColumn()
  created_at: Date;
}

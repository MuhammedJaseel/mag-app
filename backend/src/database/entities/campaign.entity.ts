import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('campaigns')
@Unique(['slug'])
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  slug: string;

  @Column()
  tenant_id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;
}

import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class CreateUserTable1709558400000 implements MigrationInterface {
  name = 'CreateUserTable1709558400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "tenants" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "unique_name" character varying NOT NULL,
                "tenant_name" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_tenants_id" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_tenants_unique_name" UNIQUE ("unique_name")
            );
            CREATE INDEX IF NOT EXISTS "IDX_tenants_unique_name" ON "tenants" ("unique_name");
        `);

    await queryRunner.query(`
            CREATE TYPE event_type_enum AS ENUM ('opened', 'clicked_more', 'liked');
            CREATE TABLE "events" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "tenant_id" uuid NOT NULL,
                "campaign_id" uuid NOT NULL,
                "ip_address" character varying NOT NULL,
                "user_agent" character varying NOT NULL,
                "event_type" event_type_enum NOT NULL,
                "count" integer NOT NULL DEFAULT 0,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_events_id" PRIMARY KEY ("id")
                );
            `);

    await queryRunner.query(`
            CREATE TYPE role_enum AS ENUM ('tenant-admin', 'tenant-user');
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "tenant_id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL, 
                "role" role_enum NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_users_id" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_users_tenant_email" UNIQUE ("tenant_id", "email")
            );
        `);

    await queryRunner.query(`
            CREATE TABLE "campaigns" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "slug" character varying NOT NULL,
                "tenant_id" uuid NOT NULL,
                "title" character varying NOT NULL,
                "content" text NOT NULL, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_campaigns_id" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_campaigns_slug" UNIQUE ("slug")
            );
            CREATE INDEX "IDX_campaigns_slug" ON "campaigns" ("slug");
        `);

    const tenantResult = await queryRunner.query(`
            INSERT INTO "tenants" (unique_name, tenant_name)
            VALUES ('tenants1', 'Tenenet 1')
            ON CONFLICT (unique_name) DO NOTHING
            RETURNING *;
        `);

    const tenantId = tenantResult[0].id;
    const hashedPassword1 = await bcrypt.hash('admin123', 10);
    const hashedPassword2 = await bcrypt.hash('dev123', 10);

    await queryRunner.query(`
            INSERT INTO "users" (tenant_id, name, email, password, role)
            VALUES 
            ('${tenantId}', 'Admin User', 'admin@jaseel.cloud', '${hashedPassword1}', 'tenant-admin'),
            ('${tenantId}', 'Dev User', 'dev@jaseel.cloud', '${hashedPassword2}', 'tenant-user');
        `);

    await queryRunner.query(`
            INSERT INTO "campaigns" (tenant_id, slug, title, content)
            VALUES (
                '${tenantId}', 
                'nexus-launch-2026', 
                'Grand Opening Campaign', 
                'Welcome to the new Nexus Ad platform dashboard.'
            );
        `);
  }

  // The 'down' method defines how to undo the changes (Rollback)
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "tenants";
        DROP TABLE "users";
        DROP TABLE "campaigns";
        DROP TABLE "events";
        DROP TABLE "migrations";
        DROP TYPE event_type_enum;
        DROP TYPE role_enum;
        `);
  }
}

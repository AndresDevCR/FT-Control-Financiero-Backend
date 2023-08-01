import { MigrationInterface, QueryRunner } from 'typeorm';
import { LOGS_SCHEMA as schema } from '@/const';

export class logs1690153036077 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${schema}";`);
    await queryRunner.query(`
      CREATE TABLE "${schema}"."logs" (
        "id" serial not null,
        "user_id" int,
        "action" varchar(255) not null,
        "message" varchar(255) not null,
        "created_at" timestamp not null default now(),
        "updated_at" timestamp not null default now(),
        primary key ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('logs');
    if (tableExists) {
      await queryRunner.query(`DROP TABLE "${schema}"."logs";`);
    }
    await queryRunner.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`);
  }
}

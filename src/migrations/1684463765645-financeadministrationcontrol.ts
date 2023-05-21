import { MigrationInterface, QueryRunner } from 'typeorm';
import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
export class financeadministrationcontrol1684463765645
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${schema}";`);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."inventory";`);

    await queryRunner.query(`CREATE TABLE "${schema}"."inventory" (
      "id" serial not null,
      "product_name" varchar(255),
      "available_quantity" int not null,
      "description" varchar(255) not null,
      "entry_date" date not null,
      "created_at" timestamp not null default now(),
      "updated_at" timestamp not null default now(),
      primary key ("id")
    );
    `);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."invoice";`);
    await queryRunner.query(`CREATE TABLE "${schema}"."invoice" (
      "id" serial not null,
      "client_name" varchar(255) not null,
      "address" varchar(255) not null,
      "phone" varchar(255) not null,
      "email" varchar(255) not null,
      "issue_date" date not null,
      "expiration_date" date not null,
      "invoice_number" int not null,
      "order_number" int not null,
      "created_at" timestamp not null default now(),
      "updated_at" timestamp not null default now(),
      primary key ("id")
    );
    `);

    await queryRunner.query(
      `DROP TABLE IF EXISTS "${schema}"."human_resource";`,
    );
    await queryRunner.query(`CREATE TABLE "${schema}"."human_resource" (
      "id" serial not null,
      "employee_name" varchar(255) not null,
      "phone" varchar(255) not null,
      "email" varchar(255) not null,
      "entry_date" date not null,
      "salary" int not null,
      "position" varchar(255) not null,
      "department" varchar(255) not null,
      "schedule" varchar(255) not null,
      "rest_days" varchar(255) not null,
      "vacation_days" varchar(255) not null,
      "created_at" timestamp not null default now(),
      "updated_at" timestamp not null default now(),
      primary key ("id")
    );
    `);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."vacation";`);
    await queryRunner.query(`CREATE TABLE "${schema}"."vacation" (
      "id" serial not null,
      "employee_name" varchar(255) not null,
      "available_quantity" int not null,
      "start_date" date not null,
      "reentry_date" date not null,
      "request_status" varchar(255) not null,
      "created_at" timestamp not null default now(),
      "updated_at" timestamp not null default now(),
      primary key ("id")
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`);
  }
}

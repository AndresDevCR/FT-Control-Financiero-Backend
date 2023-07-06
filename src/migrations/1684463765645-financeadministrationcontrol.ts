import { MigrationInterface, QueryRunner } from 'typeorm';
import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
export class financeadministrationcontrol1684463765645
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${schema}";`);
    await queryRunner.query(`
    CREATE TABLE "${schema}"."inventory" (
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

    await queryRunner.query(`
    CREATE TABLE "${schema}"."human_resource" (
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

    await queryRunner.query(`
    CREATE TABLE "${schema}"."enterprise" (
      "id" serial not null,
      "enterprise_name" varchar(255) not null,
      "created_at" timestamp not null default now(),
      "updated_at" timestamp not null default now(),
      primary key ("id")
    );
  `);

    await queryRunner.query(`
    CREATE TABLE "${schema}"."client" (
      "id" serial not null,
      "client_name" varchar(255) not null,
      "phone" varchar(255) not null,
      "email" varchar(255) not null,
      "address" varchar(255) not null,
      "enterprise_id" int not null,
      "created_at" timestamp not null default now(),
      "updated_at" timestamp not null default now(),
      primary key ("id"),
      foreign key ("enterprise_id") references "${schema}"."enterprise" ("id")
    );
  `);

    await queryRunner.query(`
    CREATE TABLE "${schema}"."quotation" (
      "id" serial not null,
      "client_id" int not null,
      "total_payment" decimal not null,
      "total_payment_dollar" decimal not null,
      "e_invoice_code" varchar(255) not null,
      "issue_date" date not null,
      "po_number" int not null,
      "po_date" date not null,
      "description" varchar(255) not null,
      "quote_title" varchar(255) not null,
      "created_at" timestamp not null default now(),
      "updated_at" timestamp not null default now(),
      primary key ("id"),
      foreign key ("client_id") references "${schema}"."client" ("id")
    );
  `);

    await queryRunner.query(`
    CREATE TABLE "${schema}"."supplier" (
      "id" serial not null,
      "supplier_name" varchar(255) not null,
      "created_at" timestamp not null default now(),
      "updated_at" timestamp not null default now(),
      primary key ("id")
    );
  `);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."invoice";`);
    await queryRunner.query(`
    CREATE TABLE "${schema}"."invoice" (
      "id" serial not null,
      "quotation_id" int not null,
      "supplier_id" int not null,
      "issue_date" date not null,
      "expiration_date" date not null,
      "invoice_number" int not null,
      "dollar_value" decimal not null,
      "total_colon" decimal not null,
      "total_dollar" decimal not null,
      "created_at" timestamp not null default now(),
      "updated_at" timestamp not null default now(),
      primary key ("id"),
      foreign key ("quotation_id") references "${schema}"."quotation" ("id"),
      foreign key ("supplier_id") references "${schema}"."supplier" ("id")
    );
  `);

    await queryRunner.query(`
    CREATE TABLE "${schema}"."department" (
      "id" serial not null,
      "department_name" varchar(255) not null,
      "created_at" timestamp not null default now(),
      "updated_at" timestamp not null default now(),
      primary key ("id")
    );
  `);

    await queryRunner.query(`
    CREATE TABLE "${schema}"."position" (
      "id" serial not null,
      "position_name" varchar(255) not null,
      "created_at" timestamp not null default now(),
      "updated_at" timestamp not null default now(),
      primary key ("id")
    );
  `);

    await queryRunner.query(`
    CREATE TABLE "${schema}"."employee" (
      "id" serial not null,
      "employee_name" varchar(255) not null,
      "enrollment_date" date not null,
      "position_id" int not null,
      "department_id" int not null,
      "monthly_salary" decimal not null,
      "email" varchar(255) not null,
      "phone" varchar(255) not null,
      "available_vacation_quantity" int not null,
      "created_at" timestamp not null default now(),
      "updated_at" timestamp not null default now(),
      primary key ("id"),
      foreign key ("position_id") references "${schema}"."position" ("id"),
      foreign key ("department_id") references "${schema}"."department" ("id")
    );
  `);

    await queryRunner.query(`
    CREATE TABLE "${schema}"."vacation" (
      "id" serial not null,
      "employee_id" int not null,
      "start_date" date not null,
      "reentry_date" date not null,
      "request_status" varchar(255) not null,
      "created_at" timestamp not null default now(),
      "updated_at" timestamp not null default now(),
      primary key ("id")
    );
  `);

    await queryRunner.query(`
    CREATE TABLE "${schema}"."payment" (
      "id" serial not null,
      "employee_id" int not null,
      "biweekly_salary" decimal not null,
      "daily_salary" decimal not null,
      "subsidy" decimal not null,
      "hour_rate" decimal not null,
      "extra_time_value" decimal not null,
      "extra_time" decimal not null,
      "extra_time_total" decimal not null,
      "medical_leave_days" decimal not null,
      "not_payed_leave_days" decimal not null,
      "gross_payment" decimal not null,
      "gross_payment_social_deduction" decimal,
      "payment_advance" decimal not null,
      "deduction_total" decimal not null,
      "net_payment" decimal not null,
      "net_payment_dollar" decimal not null,
      "ins_payroll" decimal not null,
      "created_at" timestamp not null default now(),
      "updated_at" timestamp not null default now(),
      primary key ("id"),
      foreign key ("employee_id") references "${schema}"."employee" ("id")
    );
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."payment";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."vacation";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."invoice";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."employee";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."position";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."department";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."supplier";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."quotation";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."client";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."enterprise";`);
    await queryRunner.query(
      `DROP TABLE IF EXISTS "${schema}"."human_resource";`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."inventory";`);
    await queryRunner.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`);
  }
}

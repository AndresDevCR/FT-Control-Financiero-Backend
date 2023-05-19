import { MigrationInterface, QueryRunner } from 'typeorm';
import { FINANCE_ADMINISTRATION_CONTROL as schema } from '@/const';
export class financeadministrationcontrol1684463765645
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${schema}";`);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."role";`);

    await queryRunner.query(`CREATE TABLE "${schema}"."role" (
            id SERIAL PRIMARY KEY,
            name VARCHAR ( 50 ) NOT NULL,
            description VARCHAR ( 255 ),
            created_at TIMESTAMP NOT NULL DEFAULT now(),
            updated_at TIMESTAMP NOT NULL DEFAULT now()
        );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

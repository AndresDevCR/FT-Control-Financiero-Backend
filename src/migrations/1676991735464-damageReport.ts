import { MigrationInterface, QueryRunner } from 'typeorm';
import { REPORT_DAMAGE_SCHEMA as schema } from '../const';

export class damageReport1676991735464 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${schema}";`);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."status";`);
    await queryRunner.query(`CREATE TABLE "${schema}"."status" (
            id SERIAL PRIMARY KEY,
            name VARCHAR ( 50 ) NOT NULL,
            display_name VARCHAR ( 50 ) NOT NULL
        );
        `);
    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."category";`);
    await queryRunner.query(`CREATE TABLE "${schema}"."category" (
            id SERIAL PRIMARY KEY,
            name VARCHAR ( 50 ) NOT NULL,
            display_name VARCHAR ( 50 ) NOT NULL
        );
        `);
    await queryRunner.query(`CREATE TABLE "${schema}"."ticket" (
            id SERIAL PRIMARY KEY,
            detail VARCHAR ( 255 ) NOT NULL,
            location VARCHAR ( 255 ) NOT NULL,
            email VARCHAR ( 255 ) NOT NULL,
            category INT NOT NULL,
            timestamp TIMESTAMP NOT NULL DEFAULT NOW()
        );
        `);
    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."notes";`);
    await queryRunner.query(`CREATE TABLE "${schema}"."notes" (
                id SERIAL PRIMARY KEY,
                comment VARCHAR ( 255 ) NOT NULL,
                ticket_id INT NOT NULL
            );
            `);
    await queryRunner.query(
      `ALTER TABLE "${schema}"."ticket"
          ADD CONSTRAINT category_fk FOREIGN KEY (category) REFERENCES "${schema}"."category"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );
    await queryRunner.query(
      `ALTER TABLE "${schema}"."notes"
          ADD CONSTRAINT ticket_id_fk FOREIGN KEY (ticket_id) REFERENCES "${schema}"."ticket"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."notes";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."ticket";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."category";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."status";`);
  }
}

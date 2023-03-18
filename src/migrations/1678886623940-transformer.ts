import { MigrationInterface, QueryRunner } from 'typeorm';
import { ELECTRICAL_TRANSFORMER as schema } from '../const';
import { APPLICATION_ADMINISTRATION_SCHEMA as administrative_schema } from '../const';
import { ELECTRICAL_PANELBOARD_SYSTEM_SCHEMA as ELECTRICAL_PANELBOARD_SYSTEM_SCHEMA } from '../const';

export class transformer1678886623940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${schema}";`);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."job";`);

    await queryRunner.query(
      `CREATE TABLE "${schema}"."job" (
        "id" SERIAL NOT NULL,
        "comment" varchar(100) NOT NULL,
        "company" varchar(100) NOT NULL,
        "assigned" varchar(100) NOT NULL,
        "transformer_id" integer NOT NULL,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        PRIMARY KEY ("id")
        )`,
    );

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."note";`);

    await queryRunner.query(
      `CREATE TABLE "${schema}"."note" (
        "id" SERIAL NOT NULL,
        "comment" varchar(100) NOT NULL,
        "user_id" integer NOT NULL,
        transformer_id integer NOT NULL,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        PRIMARY KEY ("id")
        )`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."note" ADD CONSTRAINT "FK_1" FOREIGN KEY ("user_id") REFERENCES "${administrative_schema}"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."note" ADD CONSTRAINT "FK_2" FOREIGN KEY ("transformer_id") REFERENCES "${ELECTRICAL_PANELBOARD_SYSTEM_SCHEMA}"."transformer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."job" ADD CONSTRAINT "FK_3" FOREIGN KEY ("transformer_id") REFERENCES "${ELECTRICAL_PANELBOARD_SYSTEM_SCHEMA}"."transformer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

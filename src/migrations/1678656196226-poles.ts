import { MigrationInterface, QueryRunner } from 'typeorm';
import { ELECTRICAL_POLES as schema } from '../const';
import { ELECTRICAL_PANELBOARD_SYSTEM_SCHEMA as ELECTRICAL_PANELBOARD_SYSTEM_SCHEMA } from '../const';
import { APPLICATION_ADMINISTRATION_SCHEMA as administrative_schema } from '../const';
export class poles1678656196226 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${schema}";`);

    await queryRunner.query(
      `DROP TABLE IF EXISTS "${schema}"."other_facility";`,
    );
    await queryRunner.query(
      `CREATE TABLE "${schema}"."other_facility" (
        "id" SERIAL NOT NULL,
        "code" varchar(100) NOT NULL,
        "name" varchar(100) NOT NULL,
        PRIMARY KEY ("id")
        )`,
    );

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."connection";`);

    await queryRunner.query(
      `CREATE TABLE "${schema}"."connection" (
        "id" SERIAL NOT NULL,
        "name" varchar(100) NOT NULL,
        "is_active" boolean NOT NULL,
        PRIMARY KEY ("id")
        )`,
    );

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."pole";`);

    await queryRunner.query(
      `CREATE TABLE "${schema}"."pole" (
        "id" SERIAL NOT NULL,
        "code" varchar(100) NOT NULL,
        "type" varchar(100) NOT NULL,
        "area" varchar(100) NOT NULL,
        "assignee" varchar(100) NOT NULL,
        "series" varchar(100) NOT NULL,
        "label" varchar(150) NOT NULL,
        "location_id" integer NOT NULL,
        PRIMARY KEY ("id")
        )`,
    );

    await queryRunner.query(
      `DROP TABLE IF EXISTS "${schema}"."electric_facility";`,
    );

    await queryRunner.query(
      `CREATE TABLE "${schema}"."electric_facility" ( 
        "id" SERIAL NOT NULL,
        "board" varchar(100) NOT NULL,
        "voltage_id" integer NOT NULL,
        "ckt" varchar(100) NOT NULL,
        "amperage" varchar(100) NOT NULL,
        "connection_id" integer NOT NULL,
        PRIMARY KEY ("id")
        )`,
    );

    await queryRunner.query(
      `DROP TABLE IF EXISTS "${schema}"."mechanic_facility";`,
    );

    await queryRunner.query(
      `CREATE TABLE "${schema}"."mechanic_facility" (
      "id" SERIAL NOT NULL,
      "name" varchar(100),
      "number_of_valves" integer,
      PRIMARY KEY ("id")
      )`,
    );

    // -----------------------------  FKs  --------------------------------

    await queryRunner.query(
      `ALTER TABLE "${schema}"."electric_facility" ADD CONSTRAINT "FK_voltage_id" FOREIGN KEY ("voltage_id") REFERENCES "${ELECTRICAL_PANELBOARD_SYSTEM_SCHEMA}"."voltage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."electric_facility" ADD CONSTRAINT "FK_connection_id" FOREIGN KEY ("connection_id") REFERENCES "${schema}"."connection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."pole" ADD CONSTRAINT "FK_location_id" FOREIGN KEY ("location_id") REFERENCES "${administrative_schema}"."location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}

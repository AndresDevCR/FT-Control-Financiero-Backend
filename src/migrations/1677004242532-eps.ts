import { MigrationInterface, QueryRunner } from 'typeorm';
import { ELECTRICAL_PANELBOARD_SYSTEM_SCHEMA as schema } from '../const';
import { APPLICATION_ADMINISTRATION_SCHEMA as administrative_schema } from '../const';

export class eps1677004242532 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${schema}";`);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."disconnector";`);

    await queryRunner.query(`CREATE TABLE "${schema}"."voltage" (
            "id" SERIAL PRIMARY KEY,
            "value" VARCHAR ( 15 ),
            "created_at" timestamp NOT NULL DEFAULT now(),
            "updated_at" timestamp NOT NULL DEFAULT now()
        );
        `);

    await queryRunner.query(`CREATE TABLE "${schema}"."thread" (
            "id" SERIAL PRIMARY KEY,
            "value" VARCHAR ( 15 ),
            "created_at" timestamp NOT NULL DEFAULT now(),
            "updated_at" timestamp NOT NULL DEFAULT now()
        );
        `);

    await queryRunner.query(`CREATE TABLE "${schema}"."phase" (
            "id" SERIAL PRIMARY KEY,
            "value" VARCHAR ( 15 ),
            "created_at" timestamp NOT NULL DEFAULT now(),
            "updated_at" timestamp NOT NULL DEFAULT now()
        );
        `);

    await queryRunner.query(
      `
            INSERT INTO "${schema}".voltage (value) VALUES('Desconocido');
            INSERT INTO "${schema}".voltage (value) VALUES(480);
            INSERT INTO "${schema}".voltage (value) VALUES(240);
            INSERT INTO "${schema}".voltage (value) VALUES(208);
            
            `,
    );

    await queryRunner.query(
      `
            INSERT INTO "${schema}".thread (value) VALUES('Desconocido');
            INSERT INTO "${schema}".thread (value) VALUES(1);
            INSERT INTO "${schema}".thread (value) VALUES(2);
            INSERT INTO "${schema}".thread (value) VALUES(3);
            INSERT INTO "${schema}".thread (value) VALUES(4);
            
            `,
    );

    await queryRunner.query(
      `
            INSERT INTO "${schema}".phase (value) VALUES('Desconocido');
            INSERT INTO "${schema}".phase (value) VALUES('1');
            INSERT INTO "${schema}".phase (value) VALUES('2');
            INSERT INTO "${schema}".phase (value) VALUES('3');
            
            `,
    );

    await queryRunner.query(`CREATE TABLE "${schema}"."disconnector" (
            "id" SERIAL PRIMARY KEY,
            "code" VARCHAR ( 50 ),
            "location_id" INT,
            "from_to" VARCHAR ( 255 ),
            "goes_to"  VARCHAR ( 255 ),
            "bus" VARCHAR ( 50 ),
            "model" VARCHAR ( 50 ),
            "main" VARCHAR ( 50 ),
            "number_of_breakers" SMALLINT,
            "emergency_panel" boolean default false,
            "voltage_id" INT,
            "thread_id" INT,
            "phase_id" INT,
            "phase_description" VARCHAR ( 255 ),
            "neutral" VARCHAR ( 255 ),
            "ground" VARCHAR ( 255 ),
            "created_at" timestamp NOT NULL DEFAULT now(),
            "updated_at" timestamp NOT NULL DEFAULT now()
        );
        `);

    await queryRunner.query(
      `ALTER TABLE "${schema}"."disconnector"
              ADD CONSTRAINT voltage_id_fk FOREIGN KEY (voltage_id) REFERENCES "${schema}"."voltage"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."disconnector"
              ADD CONSTRAINT thread_id_fk FOREIGN KEY (thread_id) REFERENCES "${schema}"."thread"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."disconnector"
              ADD CONSTRAINT phase_id_fk FOREIGN KEY (phase_id) REFERENCES "${schema}"."phase"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `
            INSERT INTO "${schema}".disconnector (code) VALUES('ICE');
            `,
    );

    await queryRunner.query(`CREATE TABLE "${schema}"."transformer" (
            "id" SERIAL PRIMARY KEY,
            "code" VARCHAR ( 50 ),
            "main" VARCHAR ( 50 ),
            "area" VARCHAR ( 50 ),
            "zone" VARCHAR ( 50 ),
            "from_to" VARCHAR ( 255 ),
            "voltage_id" INT,
            "thread_id" INT,
            "model" VARCHAR ( 50 ),
            "disconnector_id" INT,
            "created_at" timestamp NOT NULL DEFAULT now(),
            "updated_at" timestamp NOT NULL DEFAULT now()
        );
        `);

    await queryRunner.query(
      `ALTER TABLE "${schema}"."transformer"
              ADD CONSTRAINT voltage_id_fk FOREIGN KEY (voltage_id) REFERENCES "${schema}"."voltage"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."transformer"
              ADD CONSTRAINT thread_id_fk FOREIGN KEY (thread_id) REFERENCES "${schema}"."thread"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."transformer"
              ADD CONSTRAINT disconnector_id_fk FOREIGN KEY (disconnector_id) REFERENCES "${schema}"."disconnector"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(`CREATE TABLE "${schema}"."substation" (
            "id" SERIAL PRIMARY KEY,
            "code" VARCHAR ( 50 ),
            "location_id" INT,
            "from_to" VARCHAR ( 255 ),
            "goes_to"  VARCHAR ( 255 ),
            "bus" VARCHAR ( 50 ),
            "model" VARCHAR ( 50 ),
            "main" VARCHAR ( 50 ),
            "number_of_breakers" SMALLINT,
            "emergency_panel" boolean default false,
            "voltage_id" INT,
            "thread_id" INT,
            "phase_id" INT,
            "phase_description" VARCHAR ( 255 ),
            "neutral" VARCHAR ( 255 ),
            "ground" VARCHAR ( 255 ),
            "transformer_id" INT,
            "created_at" timestamp NOT NULL DEFAULT now(),
            "updated_at" timestamp NOT NULL DEFAULT now()
        );
        `);

    await queryRunner.query(
      `ALTER TABLE "${schema}"."substation"
              ADD CONSTRAINT voltage_id_fk FOREIGN KEY (voltage_id) REFERENCES "${schema}"."voltage"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."substation"
              ADD CONSTRAINT thread_id_fk FOREIGN KEY (thread_id) REFERENCES "${schema}"."thread"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."substation"
              ADD CONSTRAINT phase_id_fk FOREIGN KEY (phase_id) REFERENCES "${schema}"."phase"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."substation"
              ADD CONSTRAINT transformer_id_fk FOREIGN KEY (transformer_id) REFERENCES "${schema}"."transformer"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(`CREATE TABLE "${schema}"."breaker" (
                        "id" SERIAL PRIMARY KEY,
                        "location_id" INT,
                        "brand" VARCHAR ( 50 ),
                        "type" VARCHAR ( 50 ),
                        "caliber" VARCHAR ( 50 ),
                        "position" VARCHAR ( 50 ),
                        "panel_id" INT,
                        "voltage_id" INT,
                        "thread_id" INT,
                        "phase_id" INT,
                        "created_at" timestamp NOT NULL DEFAULT now(),
                        "updated_at" timestamp NOT NULL DEFAULT now()
                    );
                    `);

    await queryRunner.query(`CREATE TABLE "${schema}"."panel" (
                      "id" SERIAL PRIMARY KEY,
                      "code" VARCHAR ( 50 ),
                      "location_id" INT,
                      "from_to" VARCHAR ( 255 ),
                      "goes_to"  VARCHAR ( 255 ),
                      "substation_id" INT,
                      "bus" VARCHAR ( 50 ),
                      "model" VARCHAR ( 50 ),
                      "main" VARCHAR ( 50 ),
                      "number_of_breakers" SMALLINT,
                      "emergency_panel" boolean default false,
                      "voltage_id" INT,
                      "thread_id" INT,
                      "phase_id" INT,
                      "phase_description" VARCHAR ( 255 ),
                      "neutral" VARCHAR ( 255 ),
                      "ground" VARCHAR ( 255 ),
                      "created_at" timestamp NOT NULL DEFAULT now(),
                      "updated_at" timestamp NOT NULL DEFAULT now()
                  );
                  `);

    await queryRunner.query(
      `CREATE TABLE "${schema}"."comment" (
                                      "id" SERIAL PRIMARY KEY,
                                      "comment" VARCHAR ( 500 ),
                                      "user_id" INT,
                                      "panel_id" INT,
                                      "created_at" timestamp NOT NULL DEFAULT now(),
                                      "updated_at" timestamp NOT NULL DEFAULT now()
                                  );
                                  `,
    );

    await queryRunner.query(
      `CREATE TABLE "${schema}"."impact" (
                                      "id" SERIAL PRIMARY KEY,
                                      "comment" VARCHAR ( 255 ),
                                      "user_id" INT,
                                      "panel_id" INT,
                                      "created_at" timestamp NOT NULL DEFAULT now(),
                                      "updated_at" timestamp NOT NULL DEFAULT now()
                                  );
                                  `,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."breaker"
              ADD CONSTRAINT voltage_id_fk FOREIGN KEY (voltage_id) REFERENCES "${schema}"."voltage"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."breaker"
              ADD CONSTRAINT thread_id_fk FOREIGN KEY (thread_id) REFERENCES "${schema}"."thread"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."breaker"
              ADD CONSTRAINT phase_id_fk FOREIGN KEY (phase_id) REFERENCES "${schema}"."phase"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );
    // FK to panel table from breaker table

    await queryRunner.query(
      `ALTER TABLE "${schema}"."breaker"
              ADD CONSTRAINT panel_id_fk FOREIGN KEY (panel_id) REFERENCES "${schema}"."panel"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."breaker"
                              ADD CONSTRAINT location_id_fk FOREIGN KEY (location_id) REFERENCES "${administrative_schema}"."location"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."disconnector"
                    ADD CONSTRAINT location_id_fk FOREIGN KEY (location_id) REFERENCES "${administrative_schema}"."location"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."substation"
                    ADD CONSTRAINT location_id_fk FOREIGN KEY (location_id) REFERENCES "${administrative_schema}"."location"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."panel"
                    ADD CONSTRAINT location_id_fk FOREIGN KEY (location_id) REFERENCES "${administrative_schema}"."location"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."panel"
                    ADD CONSTRAINT substation_id_fk FOREIGN KEY (substation_id) REFERENCES "${schema}"."substation"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."panel"
                    ADD CONSTRAINT voltage_id_fk FOREIGN KEY (voltage_id) REFERENCES "${schema}"."voltage"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."panel"
                    ADD CONSTRAINT thread_id_fk FOREIGN KEY (thread_id) REFERENCES "${schema}"."thread"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."panel"
                    ADD CONSTRAINT phase_id_fk FOREIGN KEY (phase_id) REFERENCES "${schema}"."phase"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."comment"
              ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES "${administrative_schema}"."user"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."comment"
              ADD CONSTRAINT panel_id_fk FOREIGN KEY (panel_id) REFERENCES "${schema}"."panel"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."impact"
              ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES "${administrative_schema}"."user"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."impact"
              ADD CONSTRAINT panel_id_fk FOREIGN KEY (panel_id) REFERENCES "${schema}"."panel"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

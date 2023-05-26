import * as bcrypt from 'bcryptjs';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { APPLICATION_ADMINISTRATION_SCHEMA as schema } from '../const';

export class administration1676663942896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salt: string = bcrypt.genSaltSync(10);

    await queryRunner.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${schema}";`);

    await queryRunner.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp" with schema "public";`,
    );

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."role";`);

    await queryRunner.query(`CREATE TABLE "${schema}"."role" (
            id SERIAL PRIMARY KEY,
            name VARCHAR ( 50 ) NOT NULL,
            description VARCHAR ( 255 ),
            created_at TIMESTAMP NOT NULL DEFAULT now(),
            updated_at TIMESTAMP NOT NULL DEFAULT now()
        );
        `);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."permission";`);

    await queryRunner.query(`CREATE TABLE "${schema}"."permission" (
            id SERIAL PRIMARY KEY,
            name VARCHAR ( 50 ) NOT NULL,
            description VARCHAR ( 255 ),
            created_on TIMESTAMP NOT NULL DEFAULT now(),
            updated_on TIMESTAMP NOT NULL DEFAULT now()
        );
        `);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."profile";`);

    await queryRunner.query(`CREATE TABLE "${schema}"."profile" (
            id SERIAL PRIMARY KEY,
            image_url VARCHAR ( 300 ),
            birthdate date
        );
        `);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."company";`);

    await queryRunner.query(`CREATE TABLE "${schema}"."company" (
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR ( 100 ) NOT NULL,
            "description" VARCHAR ( 255 ),
            "category" VARCHAR ( 255 ),
            "primary_phone_number" VARCHAR ( 255 ),
            "secondary_phone_number" VARCHAR ( 255 ),
            "city" VARCHAR ( 255 ),
            "state" VARCHAR ( 255 ),
            "country" VARCHAR ( 255 ),
            "is_active" boolean default true,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        );
        `);

    await queryRunner.query(`CREATE TABLE "${schema}"."role_has_permission" (
          role_id INT NOT NULL,
          permission_id INT NOT NULL
      );
      `);

    await queryRunner.query(`CREATE TABLE "${schema}"."phone" (
        "id" SERIAL PRIMARY KEY,
        "user_id" INT NOT NULL,
        "phone" VARCHAR ( 15 ) NOT NULL,
        "type" VARCHAR ( 15 ) NOT NULL,
        "is_primary" boolean default true,
        "created_on" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_on" TIMESTAMP NOT NULL DEFAULT now()
    );
    `);

    await queryRunner.query(`CREATE TABLE "${schema}"."address" (
      "id" SERIAL PRIMARY KEY,
      "user_id" INT NOT NULL,
      "city" VARCHAR ( 15 ) NOT NULL,
      "state" VARCHAR ( 15 ) NOT NULL,
      "country" VARCHAR ( 15 ) NOT NULL,
      "description" VARCHAR ( 300 ) NOT NULL,
      "is_primary" boolean default true,
      "created_on" TIMESTAMP NOT NULL DEFAULT now(),
      "updated_on" TIMESTAMP NOT NULL DEFAULT now()
  );
  `);

    await queryRunner.query(`CREATE TABLE "${schema}"."application" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR ( 70 ) NOT NULL,
    "display_name" VARCHAR ( 70 ) NOT NULL,
    "description" VARCHAR ( 255 ),
    "is_active" boolean default true,
    "created_on" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_on" TIMESTAMP NOT NULL DEFAULT now()
);
`);

    await queryRunner.query(`CREATE TABLE "${schema}"."user_has_applications" (
    "user_id" INT NOT NULL,
    "application_id" INT NOT NULL
);
`);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."location";`);

    await queryRunner.query(`CREATE TABLE "${schema}"."location" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR ( 50 ) NOT NULL,
    "building" VARCHAR ( 50 ) NOT NULL,
    "address" VARCHAR ( 50 ) NOT NULL,
    "active" boolean default true,
    "created_on" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_on" TIMESTAMP NOT NULL DEFAULT now()
);
`);

    await queryRunner.query(`DROP TABLE IF EXISTS "${schema}"."user";`);

    await queryRunner.query(`CREATE TABLE "${schema}"."user" (
              "id" SERIAL PRIMARY KEY,
              "first_name" VARCHAR ( 50 ) NOT NULL,
              "last_name" VARCHAR ( 50 ) NOT NULL,
              "email" VARCHAR ( 255 ) UNIQUE NOT NULL,
              "password"  VARCHAR ( 255 ) NOT NULL,
              "password_reset_code" VARCHAR ( 255 ),
              "is_active" boolean default true,
              "profile_id" INT,
              "company_id" INT,
              "company_start_date" date,
              "role_id" INT,
              "created_at" timestamp NOT NULL DEFAULT now(),
              "updated_at" timestamp NOT NULL DEFAULT now(),
              "last_login" TIMESTAMP 
          );
          `);

    await queryRunner.query(
      `ALTER TABLE "${schema}"."role_has_permission"
        ADD CONSTRAINT role_id_fk FOREIGN KEY (role_id) REFERENCES "${schema}"."role"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."role_has_permission"
        ADD CONSTRAINT permission_id_fk FOREIGN KEY (permission_id) REFERENCES "${schema}"."permission"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."user"
    ADD CONSTRAINT role_id_fk FOREIGN KEY (role_id) REFERENCES "${schema}"."role"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."phone"
        ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES "${schema}"."user"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."address"
        ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES "${schema}"."user"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    // fk usuarios con company

    await queryRunner.query(
      `ALTER TABLE "${schema}"."user"
      ADD CONSTRAINT company_id_fk FOREIGN KEY (company_id) REFERENCES "${schema}"."company"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "${schema}"."user"
          ADD CONSTRAINT profile_id_fk FOREIGN KEY (profile_id) REFERENCES "${schema}"."profile"(id) ON DELETE RESTRICT ON UPDATE RESTRICT;`,
    );

    // FK User
    await queryRunner.query(
      `ALTER TABLE "${schema}"."user_has_applications" ADD CONSTRAINT "FK_user_has_applications_user_id" FOREIGN KEY ("user_id") REFERENCES "${schema}"."user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;`,
    );

    // FK Application
    await queryRunner.query(
      `ALTER TABLE "${schema}"."user_has_applications" ADD CONSTRAINT "FK_user_has_applications_application_id" FOREIGN KEY ("application_id") REFERENCES "${schema}"."application" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;`,
    );

    await queryRunner.query(
      `
            INSERT INTO "${schema}".permission (name) VALUES('read');
            INSERT INTO "${schema}".permission (name) VALUES('write');
            INSERT INTO "${schema}".permission (name) VALUES('update');
            INSERT INTO "${schema}".permission (name) VALUES('delete');
            `,
    );

    await queryRunner.query(
      `
            INSERT INTO "${schema}".role (name) VALUES('administrator');
            INSERT INTO "${schema}".role (name) VALUES('editor');
            INSERT INTO "${schema}".role (name) VALUES('visualizer');
            INSERT INTO "${schema}".role (name) VALUES('contractor');
            `,
    );

    await queryRunner.query(
      `
            INSERT INTO "${schema}".company (name) VALUES('Fusion Tech');
            INSERT INTO "${schema}".company (name) VALUES('Boston Scientific ');
            INSERT INTO "${schema}".company (name) VALUES('CooperVision');
            `,
    );

    await queryRunner.query(
      `
            INSERT INTO "${schema}".user (first_name, last_name, email, password, role_id, company_id) VALUES('Alejandro', 'Gonzalez', 'alejandro.gonzalez@fusiontech.pro', '${bcrypt.hashSync(
        'admin12345',
        salt,
      )}',1, 1);
      INSERT INTO "${schema}".user (first_name, last_name, email, password, role_id, company_id) VALUES('Manuel', 'Ulate', 'manuel.ulate@fusiontech.pro', '${bcrypt.hashSync(
        'admin12345',
        salt,
      )}',1, 1);
      INSERT INTO "${schema}".user (first_name, last_name, email, password, role_id, company_id) VALUES('Eduardo', 'Gonzalez', 'eduardo.wingrove@fusiontech.pro', '${bcrypt.hashSync(
        'admin12345',
        salt,
      )}',1, 1);
      INSERT INTO "${schema}".user (first_name, last_name, email, password, role_id, company_id) VALUES('Andres', 'Vargas', 'andres.vargas@fusiontech.pro', '${bcrypt.hashSync(
        'admin12345',
        salt,
      )}',1, 1);
      INSERT INTO "${schema}".user (first_name, last_name, email, password, role_id, company_id) VALUES('Juan', 'Martínez', 'jmartinez@fusiontech.pro', '${bcrypt.hashSync(
        'admin12345',
        salt,
      )}',1, 1);

      INSERT INTO "${schema}".user (first_name, last_name, email, password, role_id, company_id) VALUES('Rodrigo', 'Martínez', 'rodrigo.martinez@sodiel.pro', '${bcrypt.hashSync(
        'admin12345',
        salt,
      )}',1, 1);

      INSERT INTO "${schema}".user (first_name, last_name, email, password, role_id, company_id) VALUES('Asdrubal', 'Mejias', 'asdrubal.mejias@fusiontech.pro', '${bcrypt.hashSync(
        'admin12345',
        salt,
      )}',1, 1);

      INSERT INTO "${schema}".user (first_name, last_name, email, password, role_id, company_id) VALUES('Nathaly', 'Picado', 'nathalie.picado@fusiontech.pro', '${bcrypt.hashSync(
        'admin12345',
        salt,
      )}',1, 1);
            `,
    )
}
  public async down(queryRunner: QueryRunner): Promise<void> { }
}

